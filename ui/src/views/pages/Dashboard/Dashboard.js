import { mapGetters } from 'vuex'
import SummaryCard from '../../widgets/DashboardWidgets/SummaryCard/index'
import CampusMap from '../../widgets/DashboardWidgets/CampusMap/index'
import CampusActivity from '../../widgets/DashboardWidgets/CampusActivity/index'
import { createReadStream } from 'fs'
import { createDecipher } from 'crypto'

export default {
    components: {
        SummaryCard,
        CampusMap,
        CampusActivity,
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
        })
    },
    async created() {
        // this.$store.dispatch("UPDATE_TELEMETRY")
    }
}
