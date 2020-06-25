import VueApexCharts from "vue-apexcharts";
import CountChart from "./data";

export default {
  data: () => ({
    CountChart: CountChart
  }),
  components: {
    VueApexCharts
  }
};