import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            activity_data: [],
        }
    },
    methods: { 
        populateActivity() {
            this.building_data.map(building => {
                this.activity_data.push(Object.assign({}, {"name": building.name, 
                                        "image": building.image
                                        }, building.activity[0]))
            })
        }
    },
    computed: {
        ...mapGetters({building_data: "getBuildingData"}),
        ...mapGetters({dashboard_data: "getDashboardData"})
    },
    created() {
        this.populateActivity()
    }
}