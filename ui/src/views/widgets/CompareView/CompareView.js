import Tabular from './Tabular/index'
import Graphical from './Graphical/index'
import { mapGetters } from 'vuex'

export default {
    components: {
        Tabular,
        Graphical, 
    },
    data() {
        return {
            tab: null,
            views: [
                {
                    'name': 'tabular',
                    'icon': 'mdi-newspaper'
                }, 
                {
                    'name': 'graphical',
                    'icon': 'mdi-chart-bar'
                }
            ], 
            buildings: [],
        }
    },
    methods: {
        close() {
            this.$store.commit("statusCompareDialog", false);
            this.$store.commit("clearBuildingCompare");
            this.$router.push({name: "Home"})
        },
    },
    computed: {
        ...mapGetters({
            compare_buildings: "getCompareBuildings"
        }),
        ...mapGetters({
            building_data: "getBuildingData"
        })
    },
    created() {
        this.compare_buildings.map(building => {
            let found = this.building_data.find(item => item.id === building)
            if(found != null)
                this.buildings.push({
                    "name":found.name,
                    "fuel":found.fuel,
                    "band": found.band,
                    "floor_area": found.floor_area,
                    "devices": found.devices,
                    "assessor": found.assessor,
                    "id": found.id,
                })
        })
    }
}