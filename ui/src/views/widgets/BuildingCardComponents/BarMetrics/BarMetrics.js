import VueApexCharts from "vue-apexcharts";
import DownloadChart from "./data";

export default {
  name: "TheDownloadCount",
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