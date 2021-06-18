import { mapGetters } from "vuex"
import VueApexCharts from "vue-apexcharts";


function generateDataHeatMap(count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = 'w' + (i + 1).toString();
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push({
            x: x,
            y: y
        });
        i++;
    }
    return series;
}

export default {
    components: {
        VueApexCharts,    
    },
    data() {
        return {
            percentage: [74],
            total_electrical_usage: [541541],
            total_non_electrical_usage: [326],
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
            heat_map_energy: {
                series: [{
                    name: '2013',
                    data: generateDataHeatMap(18, {
                        min: 0,
                        max: 90
                    })
                },
                {
                    name: '2014',
                    data: generateDataHeatMap(18, {
                        min: 0,
                        max: 90
                    })
                },
                {
                    name: '2015',
                    data: generateDataHeatMap(18, {
                        min: 0,
                        max: 90
                    })
                },
                {
                    name: '2016',
                    data: generateDataHeatMap(18, {
                        min: 0,
                        max: 90
                    })
                },
                {
                    name: '2017',
                    data: generateDataHeatMap(18, {
                        min: 0,
                        max: 90
                    })
                },
                {
                    name: '2018',
                    data: generateDataHeatMap(18, {
                        min: 0,
                        max: 90
                    })
                },
                {
                    name: '2019',
                    data: generateDataHeatMap(18, {
                        min: 0,
                        max: 90
                    })
                },
                {
                    name: '2020',
                    data: generateDataHeatMap(18, {
                        min: 0,
                        max: 90
                    })
                },
                {
                    name: '2021',
                    data: generateDataHeatMap(18, {
                        min: 0,
                        max: 90
                    })
                }
                ],
                chartOptions: {
                    chart: {
                        type: 'heatmap',
                    }, 
                    stroke: {
                        width: 1
                    },
                    plotOptions: {
                        heatmap: {
                            shadeIntensity: 0.5,
                            radius: 0,
                            enableShades: true,
                            useFillColorAsStroke: true,
                            colorScale: {
                                ranges: [{
                                        from: 0,
                                        to: 5,
                                        color: '#00A100',
                                        // name: 'low',
                                    },
                                    {
                                        from: 6,
                                        to: 20,
                                        color: '#128FD9',
                                        // name: 'medium',
                                    },
                                    {
                                        from: 21,
                                        to: 45,
                                        color: '#FFB200',
                                        // name: 'high',
                                    },
                                    {
                                        from: 46,
                                        to: 66,
                                        color: '#e3092d',
                                        // name: 'very high',
                                    },
                                    {
                                        from: 67,
                                        to: 87,
                                        color: '#e309c2',
                                        // name: 'maximum',
                                    },
                                ]
                                },
                        },
                    },
                    dataLabels: {
                        enabled: true
                    },
                    xaxis: {
                        type: 'category',
                      } 
                },
            
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
