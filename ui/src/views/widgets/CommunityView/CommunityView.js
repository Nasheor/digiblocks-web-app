import { mapGetters } from "vuex"
import VueApexCharts from "vue-apexcharts";


export default {
    components: {
        VueApexCharts,    
    },
    data() {
        return {
            percentage: [74],
            total_electrical_usage: [541541],
            total_non_electrical_usage: [554],
            theme_colors: ['#1e88e5', '#00acc1', '#fc4b6c', '#7460ee', '#1d2126'],
            metric_options: {
                colors: ["#7460ee"],
                chart: {
                  type: "radialBar",
                  offsetY: -20
                },
                plotOptions: {
                  radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    track: {
                      background: "#e7e7e7",
                      strokeWidth: "97%",
                      margin: 5, // margin is in pixels
                      shadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        color: "#999",
                        opacity: 1,
                        blur: 2
                      }
                    },
                    dataLabels: {
                      name: {
                        show: false
                      },
                      value: {
                        offsetY: -2,
                        fontSize: "22px"
                      }
                    }
                  }
                },
                fill: {
                  type: "gradient",
                  gradient: {
                    shade: "light",
                    shadeIntensity: 0.4,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 53, 91]
                  }
                },
                labels: ["Average Results"],
                tooltip: {
                  theme: "dark"
                }                
            },
            pie_chart_environment: {
                series: [100],
                chartOptions: {
                    labels: ['Heating and Natural Ventilation'],
                    colors: this.theme_colors,
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                }
            },
            pie_chart_fuel: {
                series: [100],
                chartOptions: {
                    labels: ['Natural Gas'],
                    colors: this.theme_colors,
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                }
            },
            pie_chart_energy: {
                series: [44, 55, 13, 43, 23, 30, 24, 42],
                chartOptions: {
                    labels: ['Nimbus Center', 'Main Building', 'Rubicon Center', 'Student Center', 'Melbourne Building', 'Tourism Building', 'Admin Building', 'Create Building'],
                    colors: this.theme_colors,
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                }
            },
        }
    },
    methods: {
    },
    computed: {
        ...mapGetters({buildings_data: "getBuildingData"})
    },
    created() {

    }
}