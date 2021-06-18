import VueApexCharts from "vue-apexcharts";
import BandwidthChart from "./data";
import { mapGetters } from 'vuex';

export default {
    props:[
      "building_data"
    ],
    data: () => ({
      elementVisible: false,
      BandwidthChart: BandwidthChart
    }),
    computed: {
      ...mapGetters({timeline: "getTimelineTracker"},)
    },
    created() {
      setTimeout(() => (this.elementVisible = true), 1000);
    },
    components: {
      VueApexCharts
    }
  };