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
            id: '',
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
            },
            generate_dec: false,
            register_building: false,
            dlt_status: false,
        }
    },
    components: {
        BuildingCard,
        CompareView,
        BCard,
    },
    computed: {
        ...mapGetters(['getCompareDialogStatus', 'getCompareBuildings', 'getBuildingData',
                        'getDevicesData', 'getDecIds']),
        getDltStatus() {
            return this.dlt_status;
         },
         togglePop() {
             return this.generate_dec
         },
         toggleBuildingPop() {
             return this.register_building
         }
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
        },
        async registerBuilding() {
            let building_data;
            this.getBuildingData.map(building => {
                if (building.name === this.name) {
                    building_data = building
                }
            })
            if(building_data.dlt_status === true) {
                confirm("Building already registered to the ledger!")
                return 
            }
            let status = ""
            if(building_data.assessor === 'Not Verified') {
                status = "Pending"
            } else {
                status = "Verified"
            }

            // this.$store.dispatch("REGISTER_ASSET", {
            //     "fcn": "createAsset",
            //     "peer": ["peer0.org1.digiblocks.com", "peer0.org2.digiblocks.com"],
            //     "chaincodeName":"identitycontract",
            //     "channelName" : "mychannel",
            //     "args": [building_data.name, building_data.category, status, {
            //         "environment":building_data.environment,
            //         "fuel": building_data.fuel,
            //         "id": building_data.id,
            //         "category": building_data.dec_category,
            //         "main_fuel": building_data.main_fuel,
            //         "hours": building_data.hours,
            //         "floor": building_data.floor
            //     }]
            // })
            console.log(building_data.dec_id)
            let payload = {
                "body": {
                    "dlt_status": true
                },
                "id": building_data.dec_id
            }
            console.log(payload.id)
            this.$store.dispatch("UPDATE_DEC", {"body": payload.body, "id": payload.id}).then(tb => {
                this.register_building = true
                building_data.dlt_status = true
                this.dlt_status = true                   
            }).then(a => {
                // confirm("Ledger Registration ID: "+building_data.id+". Please Login again to see changes.")
                // this.$store.commit("clearData")
                // this.$router.push({name: "Login"})
                // location.reload(); 
            })
        },
        async generateDec() {
            let data = ""
            if(this.name.length > 1) {
                data = this.getBuildingData.find(building => building.name === this.name)
                let device_data = {
                    'gas': '',
                    'electricity': '',
                }
                
                let dec_sensor = this.getDecIds.find(sensor => sensor.asset_id === this.id)
                console.log(this.getDecIds)

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
                console.log(data)
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
                    this.dec.sales_floor_area, this.dec.net_lettable_aream, this.dec.electricity_energy_use,
                    this.dec.electricity_energy_unit, this.dec.fossil_use, this.dec.fossil_type,
                    this.dec.fossil_unit, this.dec.year
                ).then(result => {
                    console.log(result)
                   body = {
                       "ber": result.ber,
                       "co2_performance": result.co2_performance,
                       "band": result.rating_scale,
                       "total_energy_use_per_area": result.total_energy_use_per_area,
                       "annual_non_electrical": result.fossil_thermal_benchmark_degree_day_and_occupancy_adjusted,
                       "annual_electrical": result.electricity_benchmark_converted,
                       "building_electrical": result.electricity_typical_benchmark,
                       "building_non_electrical": result.fossil_thermal_energy_use_per_area,
                       "dlt_status": false,
                       "dlt_cert_status": false,
                       "certificate_verified": false,
                       "assessor": 'Not Verified'
                   }
                   console.log(data.dec_id)
                   console.log(data.name)
                   this.$store.dispatch("UPDATE_DEC", {"body": body, "id": data.dec_id} ).then(r => {
                    this.generate_dec = true              
                })
               })
               console.log(data)
            //    try {
            //     this.$store.dispatch("REGISTER_DEC", {
            //         "fcn": "createDEC",
            //         "peer": ["peer0.org1.digiblocks.com", "peer0.org2.digiblocks.com"],
            //         "chaincodeName":"deccontract",
            //         "channelName" : "mychannel",
            //         "args": [data.id, data.name, data.category, data.ber,
            //                 data.annual_electrical, data.annual_non_electrical, data.date_of_issue,
            //                 data.expiry, data.band]
            //         })
            //         let payload = {
            //             "body": {
            //                 "dlt_cert_status": true
            //             },
            //             "id": data.id
            //         }
            //         setTimeout(() => { confirm("Writing to the Ledger..");}, 5000)
            //         this.$store.dispatch("UPDATE_ASSET_STATUS", payload).then(_ => {
            //            data.dlt_cert_status = true
            //            this.dlt_status = true
            //            confirm("Certification Registration ID: "+data.id+". Please Login again to see changes.")
            //            this.$store.commit("clearData")
            //            this.$router.push({name: "Login"})
            //            location.reload();
            //         })
            //    } catch(Exception) {
            //        return 
            //    }

            }
        }
    },
    created() {
        // this.dlt_status = this.getBuildingData.find(building => building.name === this.name).dlt_status;
    }
}