import VueApexCharts from 'vue-apexcharts'

export default {
    props: {
        chartData: Object,
        certificate_keys: Array,
        certificate_data: Object,
    },
    components: {
        VueApexCharts,
    },
}