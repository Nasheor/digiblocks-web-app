import BuildingCard from '../../sections/BuildingCard/index'
import BCard from '../../widgets/BuildingCardComponents/index'
import CompareView from '../../widgets/CompareView/index'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            dialog: false,
            add_building_status: false,
            name: '', 
            valid: false,
            form_dialog: false,

        }
    },
    components: {
        BuildingCard,
        CompareView,
        BCard,
    },
    computed: {
        ...mapGetters(['getCompareDialogStatus', 'getCompareBuildings', 'getBuildingData']),
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
        // addBuilding() {
        //     this.$refs.form.validate();
        //     if (this.$refs.form.validate(true)) {
        //         console.log("Contact Added")
        //         alert("Contact Added")
        //     }
        // },
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

        }
    }
}