import VueApexCharts from "vue-apexcharts";
import BandwidthChart from "./data";
export default {
    data: () => ({
      elementVisible: false,
      BandwidthChart: BandwidthChart
    }),
    created() {
      setTimeout(() => (this.elementVisible = true), 1000);
    },
    components: {
      VueApexCharts
    }
  };