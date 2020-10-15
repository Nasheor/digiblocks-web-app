import BuildingCard from '../../sections/BuildingCard/index'
import BCard from '../../widgets/BuildingCardComponents/index'
import CompareView from '../../widgets/CompareView/index'
import BuildingForm from '../../sections/BuildingForm/index'
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
        BuildingForm,
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
        },
    }
}