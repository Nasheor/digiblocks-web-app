import VueApexCharts from "vue-apexcharts";
import DownloadChart from "./data";
import { mapGetters } from 'vuex'

export default {
  props: [
    "building_data"
  ],
  data: () => ({
    elementVisible: false,
    DownloadChart: DownloadChart
  }),
  computed: {
    ...mapGetters({timeline: "getTimelineTracker"})
  },
  created() {
    setTimeout(() => (this.elementVisible = true), 1000);
  },
  components: {
    VueApexCharts
  }
};