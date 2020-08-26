import { mapGetters } from 'vuex'
import SummaryCard from '../../widgets/DashboardWidgets/SummaryCard/index'
import CampusMap from '../../widgets/DashboardWidgets/CampusMap/index'

export default {
    components: {
        SummaryCard,
        CampusMap
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
    }
}
