import TimeSeries from './TimeSeries/index'
import BarGraph from './BarGraph/index'
import LineMetrics from './LineMetrics/index'
import BarMetrics from './BarMetrics/index'
import MetricsTable from './MetricsTable/index'
import PieChart from './Piechart/index'
import Timeline from './Timeline/index'
import Profile from './Profile/index'
import { mapGetters } from 'vuex'

export default {
    props: [
        "name",
    ],
    data() {
        return {
            building_data: '',
        };
    },
    components: {
        TimeSeries,
        BarGraph,
        LineMetrics,
        BarMetrics,
        MetricsTable,
        PieChart,
        MetricsTable,
        PieChart,
        Timeline,
        Profile,
    },
    computed: {
        ...mapGetters({
            buildings: "getBuildingData"
        })
    },
    created() {
        this.building_data = this.buildings.find(building => building.name === this.name)
    }
}
