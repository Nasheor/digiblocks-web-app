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
                        'getDevicesData', 'getRole', 'getEditFormStatus']),
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
                let default_unit = "kWh"
                this.dec.category = data.category
                this.dec.environment = data.environment
                this.dec.latitude = parseFloat(data.latitude)
                this.dec.longitude = parseFloat(data.longitude)
                this.dec.hours = data.hours
                this.dec.total_useful_floor_area = data.floor_area
                this.dec.sales_floor_area = 0
                this.dec.net_lettable_area = 0
                this.dec.electricity_energy_use = parseFloat(device_data.electricity)
                this.dec.electricity_energy_unit = default_unit
                this.dec.fossil_use = parseFloat(device_data.gas)
                this.dec.fossil_type = data.fuel,
                this.dec.fossil_unit = default_unit,
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
                            this.dec.fossil_unit, this.dec.year ]                    
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
            this.$router.push({name: "Home"})
        }
    },
    created() {
        // this.dlt_status = this.getBuildingData.find(building => building.name === this.name).dlt_status;
    }
}