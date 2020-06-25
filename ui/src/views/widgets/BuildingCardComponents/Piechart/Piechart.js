import VueApexCharts from "vue-apexcharts";
import VisitChart from "./data";

export default {
  data: () => ({
    select: { state: "January", abbr: "FL" },
    items: [
      { state: "January", abbr: "FL" },
      { state: "February", abbr: "GA" },
      { state: "March", abbr: "NE" },
      { state: "April", abbr: "CA" }
    ],
    VisitChart: VisitChart
  }),
  components: {
    VueApexCharts
  }
};