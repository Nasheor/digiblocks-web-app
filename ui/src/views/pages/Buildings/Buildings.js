import BuildingCard from '../../sections/BuildingCard/index'
import BCard from '../../widgets/BuildingCardComponents/index'
import CompareView from '../../widgets/CompareView/index'
import EditBuildingForm from '../../widgets/EditBuilding/index'
import CommunityView from '../../widgets/CommunityView/index'
import { mapGetters } from 'vuex'
import Dec from '../../../service/dec/dec'
import chartData from '../Certificate/energyData'
import CertificateModal from '../Certificate/CertificateModal/index.vue'

export default {
    data() {
        return {
            dialog: false,
            add_building_status: false,
            name: '', 
            id: '',
            valid: false,
            data: chartData,
            form_dialog: false,
            building_data: '',
            certificate_dialog: false,
            dec: {
                "category": "",
                "environment": "",
                "latitude": "",
                "longitude": "",
                "hours": 0,
                "total_useful_floor_area":0,
                "sales_floor_area": 0,
                "net_lettable_area": 0,
                "electricity_energy_use":0,
                "electricity_energy_unit": "",
                "fossil_use": 0,
                "fossil_type":"",
                "fossil_unit": "",
                "year": 0
            },
            generate_dec: false,
            register_building: false,
            dlt_status: false,
            b_card_data: '',
            community_status: false,
            views: [
                {
                    'name': 'Dec',
                    'icon': 'mdi-newspaper'
                }, 
                {
                    'name': 'Asset Registration',
                    'icon': 'mdi-chart-bar'
                }
            ],
            tab: null,
            transactions_dec: [],
            history: false,
            data_dec: "",
            co2: 0.0,
            energy_use_per_area: 0.0,
            default_unit: "kWh",
        }
    },
    components: {
        BuildingCard,
        CompareView,
        BCard,
        EditBuildingForm,
        CommunityView,
        CertificateModal,
    },
    computed: {
        ...mapGetters(['getCompareDialogStatus', 'getCompareBuildings', 'getBuildingData',
                        'getDevicesData', 'getRole', 'getEditFormStatus', 'getAddress']),
        ...mapGetters(["getHistoryStatus"]),
        getDltStatus() {
            return this.b_card_data.dlt_status;
         },
         getDltCertStatus() {
             return this.b_card_data.dlt_cert_status;
         },
         togglePop() {
             return this.generate_dec
         },
         toggleBuildingPop() {
             return this.register_building
         },
    },
    methods: {
        open() {
            if(this.getCompareBuildings.length>1) {
                this.$store.commit("statusCompareDialog", true);
                console.log(this.getCompareBuildings)
            } else {
                alert("You need to select atleast two buildings to compare");
                this.$store.commit("statusCompareDialog", false);
                this.$router.push({name: "Home"})
            }
        },
        close() {
            this.generate_dec = false
        },
        setName(building) {
            this.name = building.name
            this.id = building.id
            this.b_card_data = building
            this.certificate_keys = building.certificate_keys.split(",")
        },
        setEditFormStatus() {
            this.$store.commit("setEditFormStatus", true)
        },
        async registerBuilding() {
            let building_data;
            this.getBuildingData.map(building => {
                if (building.name === this.name) {
                    building_data = building
                }
            })
            console.log(building_data)
            if(building_data.dlt_status === true) {
                confirm("Building already registered to the ledger!")
                return 
            }

            let status = "Approved"
            console.log(building_data)
            this.$store.dispatch("REGISTER_ASSET", {
                "fcn": "createAsset",
                "peer": ["peer0.org1.digiblocks.com", "peer0.org2.digiblocks.com"],
                "chaincodeName":"identitycontract",
                "channelName" : "mychannel",
                "args": [building_data.id, building_data.category, status, `{\"environment\": \"${building_data.environment}\",\"name\": \"${building_data.name}\",\"main_fuel\": \"${building_data.fuel}\"}`
                ]
            }).then(result => {
                console.log(result)
            })
            let payload = {
                "body": {
                    "dlt_status": true
                },
                "id": building_data.id
            }
            console.log(building_data)
            this.$store.dispatch("UPDATE_ASSET_STATUS", {"body": payload.body, "id": payload.id}).then(tb => {
                this.register_building = true
                building_data.dlt_status = true
                this.dlt_status = true                   
            })
            confirm("Ledger Registration ID: "+building_data.id+".")
        },

        async generateDec() {
            let data = ""
            if(this.name.length > 1) {
                data = this.getBuildingData.find(building => building.name === this.name)
                let device_data = {
                    'gas': '',
                    'electricity': '',
                }               
                let years =  ''
                let asset_id = ''
                this.getDevicesData.map(device => {
                    if (device.asset_id === data.id) {
                        asset_id = device.asset_id
                        if(device.type === "ELEC") {
                            device_data.electricity = device.value
                            years = new Date(device.ts)
                            years = years.getFullYear()
                        } else {
                            device_data.gas = device.value
                        }
                    }
                })
                this.dec.category = data.category
                this.dec.environment = data.environment
                this.dec.latitude = parseFloat(data.latitude)
                this.dec.longitude = parseFloat(data.longitude)
                this.dec.hours = data.hours
                this.dec.total_useful_floor_area = data.floor_area
                this.dec.sales_floor_area = 0
                this.dec.net_lettable_area = 0
                this.dec.electricity_energy_use = parseFloat(device_data.electricity)
                this.dec.electricity_energy_unit = this.default_unit
                this.dec.fossil_use = parseFloat(device_data.gas)
                this.dec.fossil_type = data.fuel,
                this.dec.fossil_unit = this.default_unit,
                // this.dec.energy_usage = default_fuel
                this.dec.year = years

                let body
                Dec.dec(
                    this.dec.category, this.dec.environment, this.dec.latitude,
                    this.dec.longitude, this.dec.hours, this.dec.total_useful_floor_area, 
                    this.dec.sales_floor_area, this.dec.net_lettable_area, this.dec.electricity_energy_use,
                    this.dec.electricity_energy_unit, this.dec.fossil_use, this.dec.fossil_type,
                    this.dec.fossil_unit, this.dec.year
                ).then(result => {
                    body = {
                        "ber": result.ber,
                        "co2_performance": result.co2_performance,
                        "band": result.rating_scale,
                        "total_energy_use_per_area": result.total_energy_use_per_area,
                        "annual_non_electrical": result.fossil_thermal_benchmark_degree_day_and_occupancy_adjusted,
                        "annual_electrical": result.electricity_benchmark_converted,
                        "building_electrical": result.electricity_typical_benchmark,
                        "building_non_electrical": result.fossil_thermal_energy_use_per_area,
                        "dlt_status": true,
                        "dlt_cert_status": true,
                        "certificate_verified": false,
                        "assessor": 'Not Verified',
                        "certificate_generated": true
                    }
                    this.co2 = body.co2_performance
                    this.energy_use_per_area = body.total_energy_use_per_area
                    this.$store.dispatch("UPDATE_DEC", {"body": body, "id": data.dec_id} ).then(r => {
                        this.generate_dec = true 
                    }).then(r => {
                        console.log("Updated Thingsboard!")
                    })
                })
                let register_dec_body = {
                    "fcn": "createDEC",
                    "peer": ["peer0.org1.digiblocks.com", "peer0.org2.digiblocks.com"],
                    "chaincodeName":"deccontract",
                    "channelName" : "mychannel",
                    "args": [data.dec_id, data.id, data.category, data.ber.toString(),
                            data.annual_electrical.toString(), data.annual_non_electrical.toString(), data.issue,
                            data.expiry, data.band, this.dec.environment, this.dec.hours, this.dec.total_useful_floor_area, 
                            this.dec.sales_floor_area, this.dec.net_lettable_area, this.dec.electricity_energy_use,
                            this.dec.electricity_energy_unit, this.dec.fossil_use, this.dec.fossil_type,
                            this.dec.fossil_unit, this.dec.year, this.dec_fossil_unit]                    
                }
                console.log(register_dec_body)
                this.$store.dispatch("REGISTER_DEC", {
                    "body": register_dec_body
                }).then(result => {
                    console.log(result)
                })
            }
        },
        async openCertHistory() {
            this.history = true
            this.$store.commit("setHistoryStatus", true)
            console.log("DEC ID:"+this.b_card_data.dec_id)
            let payload_dec = {
                "params": {
                    fcn: "traceDEC",
                    chainCodeName: "deccontract",
                    channelName: "mychannel",
                    args: `["${this.b_card_data.dec_id}"]`
                },
            }   
            console.log(payload_dec)
            this.$store.dispatch("TRACE_DEC", payload_dec).then(result => {
                this.transactions_dec = result.result                
                console.log(this.transactions_dec)
                this.$store.commit("setTransactionData", this.transactions_dec);
            })
        },
        verifyCert() {
            let body = {
                "assessor": this.email,
                "certificate_verified": true
              }
              let payload = {
                "id": this.b_card_data.id,
                "body": body
              }
              this.$store.dispatch("UPDATE_ASSET_STATUS", payload)

              confirm("Are you sure you want to verify this certificate?");
        },
        closeHistory() {
            this.$store.commit("setHistoryStatus", false)
            this.dialog = false;
            if(this.getRole === "External Verifier")
                this.$router.push({name: "Buildings"})
            else
                this.$router.push({name: "Home"})
        },
        storeDataIOTA() {
            let data = this.getBuildingData.find(building => building.name === this.name)
            console.log(data)
            let payload = {
                "user_id": 16,
                "certifier_id": 3,
                "dec": {
                    "building": this.name,
                    "address" : this.getAddress,
                    "category": data.category,
                    "environment": data.environment,
                    "latitude": parseFloat(data.latitude),
                    "longitude": parseFloat(data.longitude),
                    "hours_of_occupancy": data.hours,
                    "floor_area_m2": data.floor_area,
                    "floor_area_type": "Total useful floor area",
                    "electricity_energy_use": data.building_electrical,
                    "electricity_energy_units": this.default_unit,
                    "fossil_thermal_energy_use": data.building_non_electrical,
                    "fossil_thermal_energy_type": data.fuel,
                    "year": data.issue.split("/")[2],
                    "electricity_typical_benchmark_kwh_m2_yr": 80,
                    "fossil_thermal_typical_benchmark_kwh_m2_yr": 240,
                    "portion_electricity_benchmark_pro_rated_to_degree_days": 0,
                    "portion_fossil_thermal_benchmark_pro_rated_to_degree_days": 0.55,
                    "degree_days": 2138,
                    "electricity_benchmark_degree_days_adjusted_kwh_m2_yr": 80,
                    "fossil_thermal_benchmark_degree_days_adjusted_kwh_m2_yr": 247.64176150420582,
                    "benchmark_hours_per_year": 2450,
                    "maximum_allowed_hours_per_year": 5355,
                    "portion_increase_in_electricity_benchmark_at_maximum_allowed_hours_per_year": 0.48,
                    "portion_increase_in_fossil_thermal_benchmark_at_maximum_allowed_hours_per_year": 0.22,
                    "electricity_benchmark_degree_days_and_occupancy_adjusted_kwh_m2_yr": 93.87951807228916,
                    "fossil_thermal_benchmark_degree_days_and_occupancy_adjusted_kwh_m2_yr": 267.33375699731135,
                    "electricity_conversion_factor": 1.939183,
                    "electricity_benchmark_converted_kwh_m2_yr": 182.0495654939759,
                    "fossil_thermal_conversion_factor": 1.1,
                    "fossil_thermal_benchmark_converted_kwh_m2_yr": 294.0671326970425,
                    "electricity_energy_use_kwh_yr": 256283,
                    "fossil_thermal_energy_use_kwh_yr": 138848.13888889033,
                    "useful_floor_area_m2": 3000,
                    "electricity_energy_use_per_area_kwh_m2_yr": 85.42766666666667,
                    "fossil_thermal_energy_use_per_area_kwh_m2_yr": 46.282712962963444,
                    "total_energy_use_per_area_kwh_m2_yr": 131.7103796296301,
                    "ber": 27.66346572805724,
                    "electricity_emissions_factor_kg_co2_kwh": 0.3754,
                    "electricity_benchmark_emissions_kg_co2_m2_yr": 68.34140688643856,
                    "fossil_thermal_emissions_factor_kg_co2_kwh": 0.2047,
                    "fossil_thermal_benchmark_emissions_kg_co2_m2_yr": 60.195542063084595,
                    "electricity_energy_use_per_area_emissions_kg_co2_m2_yr": 32.06954606666667,
                    "fossil_thermal_energy_use_per_area_emissions_kg_co2_m2_yr": 9.474071343518617,
                    "total_energy_use_per_area_emissions_kg_co2_m2_yr": (data.annual_non_electrical + data.annual_electrical),
                    "co2_performance": data.co2_performance,
                    "rating_scale": data.ber                   
                }
            }
            console.log(payload)
            this.$store.dispatch("SEND_DEC_IOTA", payload).then(result => {
                 console.log(result)
            })
        }
    },
    created() {
        // this.dlt_status = this.getBuildingData.find(building => building.name === this.name).dlt_status;
    }
}