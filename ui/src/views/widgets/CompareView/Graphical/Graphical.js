import ColumnChart from './ColumnChart/index.vue'
import BarChart from './BarChart/index.vue'
import MixedChart from './MixedChart/index.vue'
import HeatMap from './HeatMap/index.vue'
import LineAreaChart from './LineAreaChart/index.vue'
import PieChart from './PieChart/index.vue'
import RadialChart from './RadialChart/index.vue'
import BubbleChart from './BubbleChart/index.vue'
import graphChartData from './graphChartData.js'

export default {
    props: [
        "compare_buildings",
    ],
    data() {
        return {
            chartData: graphChartData,
        }
    },
    components: {
        ColumnChart,
        BarChart, 
        MixedChart,
        HeatMap,
        LineAreaChart,
        PieChart,
        RadialChart,
        BubbleChart,
    },
};