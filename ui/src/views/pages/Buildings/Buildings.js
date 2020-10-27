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
        ...mapGetters(['getCompareDialogStatus', 'getCompareBuildings', 'getBuildingData']),
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
        generateDec() {
            if(this.name.length > 1) {
                data = this.getBuildingData.find(building => building.name === this.name)

                dec.category = data.category
                dec.environment = data.environment
                dec.latitude = data.latitude
                dec.longitude = data.longitude
                dec.hours = data.hours[0]
                dec.total_useful_floor_area = data.floor_area[0]
                dec.sales_floor_area = 0
                dec.net_lettable_area = 0
                dec.electricity_energy_use = 0
                dec.electricity_energy_unit = "kWh"
                dec.fossil_use = 0
                dec.fossil_type = "Natural gas",
                dec.fossil_unit = "kWh",
                year = data.expiry.split(" ")[2]

                Dec.dec(
                    dec.category, dec.environment, dec.latitude,
                    dec.longitude, dec.hours, dec.total_useful_floor_area, 
                    dec.sales_floor_area, dec.net_lettable_aream, dec.electricity_energy_use,
                    dec.electricity_energy_unit, dec.fossil_use, dec.fossil_type,
                    dec.fossil_unit. dec.year
                ).then(result => {
                   console.log(result)
               })
            }
        }
    }
}