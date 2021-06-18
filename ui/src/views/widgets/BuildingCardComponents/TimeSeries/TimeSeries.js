import VueApexCharts from "vue-apexcharts";
import SalesAmpleChart from "./data";
import { mapGetters } from 'vuex'

export default {
  props: [
    "building_data",
  ],
  data: () => ({
    SalesAmpleChart: SalesAmpleChart
  }),
  components: {
    VueApexCharts
  },
  methods: {

  },
};