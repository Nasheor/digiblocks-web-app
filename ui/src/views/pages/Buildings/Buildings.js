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
            building_name: '',
            address: '',
            band: '',
            rating: '',
            phone: '',
            fnameRules: [v => !!v || "Name is required"],
            contactRules: [
                v => !!v || "Contact is required",
                v => (v && v.length == 10) || "Contact must be 10 digits"
            ],
            bandRules: [v => !!v || "Band is required"],
            ratingRules: [
                v => !!v || "Please fill this field",
                v => (v && v.length <= 7) || "This must be less than 7 characters"
              ],
            addressRules: [
                v => !!v || "Address is required",
                v => (v && v.length <= 300) || "Address must be less than 10 characters"
              ],
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
                this.$router.push({name: "Dashboard"})
            }
        },
        setName() {
            console.log("name is et");
        },
        addBuilding() {
            this.$refs.form.validate();
            if (this.$refs.form.validate(true)) {
                console.log("Contact Added")
                alert("Contact Added")
            }
          }
    }
}