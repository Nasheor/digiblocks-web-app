import BCard from '../../widgets/BuildingCardComponents/index.vue' 
import { mapGetters } from 'vuex'

export default {
    components: {
        BCard,
    },
    props: ["id", "name", "src","compare","floor_area", 
            "latitude", "longitude", "category", "environment",
            "hours", "entire_building"], 
    data() {
        return {
            show: false,
            notifications: false,
            sound: true,
            widgets: false,
            isSelected: false,
        };
    },
    methods: {
        addBuilding() {
            if(this.isSelected) {
                this.$store.commit("addBuildingToCompare", this.id);
            } else {
                this.$store.commit("removeBuildingCompare", this.id);
            }
        },
    },
    computed: {
        ...mapGetters(["getRole"]),
    }
}