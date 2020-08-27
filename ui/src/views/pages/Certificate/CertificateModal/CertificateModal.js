import VueApexCharts from 'vue-apexcharts'
import { mapGetters } from 'vuex'

export default {
    props: {
        chartData: Object,
        certificate_keys: Array,
        certificate_data: Object,
    },
    components: {
        VueApexCharts,
    },
    data() {
        return {
        };
    },
}