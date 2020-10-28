import BuildingCard from '../../sections/BuildingCard/index'
import BCard from '../../widgets/BuildingCardComponents/index'
import CompareView from '../../widgets/CompareView/index'
import { mapGetters } from 'vuex'
import Dec from '../../../service/dec/dec'

export default {
    data() {
        return {
            dialog: false,
            add_building_status: false,
            name: '', 
            valid: false,
            form_dialog: false,
            building_data: '',
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
            }
        }
    },
    components: {
        BuildingCard,
        CompareView,
        BCard,
    },
    computed: {
        ...mapGetters(['getCompareDialogStatus', 'getCompareBuildings', 'getBuildingData',
                        'getDevicesData']),
        getDltStatus() {
            if(this.name.length > 1)
                return this.getBuildingData.find(building => building.name === this.name).dlt_status;
            else {
                return false
            }
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
        setName() {
            console.log("name is et");
        },
        registerBuilding() {
            let building_data;
            this.getBuildingData.map(building => {
                if (building.name === this.name) {
                    building_data = building
                }
            })
            this.$store.dispatch("REGISTER_ASSET", {
                "fcn": "createAsset",
                "peer": ["peer0.org1.digiblocks.com", "peer0.org2.digiblocks.com"],
                "chaincodeName":"identitycontract",
                "channelName" : "mychannel",
                "args": [building.name, building.category, {
                    "environment":building.environment,
                    "date_of_issue": building.issue,
                    "date_of_expiry": building.expiry,
                    "ber": building.ber,
                    "fuel": building.fuel,
                    "assessor": building.assessor
                }]
            })
            alert("Building Registered to the Ledger!")
        },
        async generateDec() {
            if(this.name.length > 1) {
                let data = this.getBuildingData.find(building => building.name === this.name)
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
                this.dec.hours = data.hours[0].value
                this.dec.total_useful_floor_area = data.floor_area[0].value
                this.dec.sales_floor_area = 0
                this.dec.net_lettable_area = 0
                this.dec.electricity_energy_use = parseFloat(device_data.electricity)
                this.dec.electricity_energy_unit = default_unit
                this.dec.fossil_use = parseFloat(device_data.gas)
                this.dec.fossil_type = data.main_fuel,
                this.dec.fossil_unit = default_unit,
                this.dec.year = years
                console.log(this.dec)
                Dec.dec(
                    this.dec.category, this.dec.environment, this.dec.latitude,
                    this.dec.longitude, this.dec.hours, this.dec.total_useful_floor_area, 
                    this.dec.sales_floor_area, this.dec.net_lettable_aream, this.dec.electricity_energy_use,
                    this.dec.electricity_energy_unit, this.dec.fossil_use, this.dec.fossil_type,
                    this.dec.fossil_unit, this.dec.year
                ).then(result => {
                   console.log(result)
                   let body = {
                       "ber": result.ber,
                       "co2_performance": result.co2_performance,
                       "band": result.rating_scale,
                       "total_energy_use_per_area": result.total_energy_use_per_area,
                       "annual_non_electrical": result.fossil_thermal_benchmark_degree_day_and_occupancy_adjusted,
                       "annual_electrical": result.electricity_benchmark_converted,
                       "building_electrical": result.electricity_typical_benchmark,
                       "building_non_electrical": result.fossil_thermal_energy_use_per_area,
                       "dlt_status": false,
                       "certificate_verified": false,
                       "assessor": 'Not Verified'
                   }
                   this.$store.dispatch("UPDATE_DEC", {"body": body, "id": asset_id} )
               })
            }
        }
    }
}