import VueApexCharts from "vue-apexcharts";
import SalesAmpleChart from "./data";

export default {
  props: [
    "building_data",
  ],
  data: () => ({
    SalesAmpleChart: SalesAmpleChart
  }),
  components: {
    VueApexCharts
  }
};