import { mapGetters } from 'vuex'
import TimelineTracker from '../../widgets/DashboardWidgets/TimelineTracker/index'
import SummaryCard from '../../widgets/DashboardWidgets/SummaryCard/index'
import CampusMap from '../../widgets/DashboardWidgets/CampusMap/index'
import CampusActivity from '../../widgets/DashboardWidgets/CampusActivity/index'
import CommunityView from '../../widgets/CommunityView/index'

export default {
    components: {
        SummaryCard,
        CampusMap,
        CampusActivity,
        CommunityView,
        TimelineTracker,
    },
    data () {
        return {
        } 
    },

    methods: {
        complete (index) {
            this.list[index] = !this.list[index]
        },
    },
    computed: {
        ...mapGetters({
            summary_card_data: 'getDashboardData'
        }),
        ...mapGetters({
            role: 'getRole'
        })
    },
    async created() {
        // this.$store.dispatch("UPDATE_TELEMETRY")
        if(this.role === "Building Owner") {
            this.$router.push({name: "Buildings"})
        }
    }
}
