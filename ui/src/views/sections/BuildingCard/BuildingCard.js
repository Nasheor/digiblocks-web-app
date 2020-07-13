import BCard from '../../widgets/BuildingCardComponents/index.vue' 

export default {
    components: {
        BCard,
    },
    props: ["id", "name", "src"], 
    data() {
        return {
            show: false,
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
            isSelected: false,
        };
    },
    methods: {
        deleteBuilding() {

        },
    },
    watch: {
        isSelected() {
            if(this.isSelected) {
                console.log("Add Something");
                this.$store.commit("addBuildingToCompare", this.id);
            } else {
                this.$store.commit("removeBuildingCompare", this.id);
            }
        }
    }
}