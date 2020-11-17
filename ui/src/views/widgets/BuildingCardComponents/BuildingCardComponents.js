import TimeSeries from './TimeSeries/index'
import BarGraph from './BarGraph/index'
import LineMetrics from './LineMetrics/index'
import BarMetrics from './BarMetrics/index'
import MetricsTable from './MetricsTable/index'
import PieChart from './Piechart/index'
import Timeline from './Timeline/index'
import Profile from './Profile/index'

export default {
    props: [
        "name",
        "building",
    ],
    data() {
        return {
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
        getDltStatus() {
            return this.building.dlt_status;
        },
        getBuilding() {
            return this.building
        }
    },
}
