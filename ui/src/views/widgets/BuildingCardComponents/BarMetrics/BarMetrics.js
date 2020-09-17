import VueApexCharts from "vue-apexcharts";
import DownloadChart from "./data";

export default {
  props: [
    "building_data"
  ],
  data: () => ({
    elementVisible: false,
    DownloadChart: DownloadChart
  }),
  created() {
    setTimeout(() => (this.elementVisible = true), 1000);
  },
  components: {
    VueApexCharts
  }
};