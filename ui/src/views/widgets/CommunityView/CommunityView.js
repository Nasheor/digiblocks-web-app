import { mapGetters } from "vuex"
import VueApexCharts from "vue-apexcharts";


function generateDataHeatMap(count, yrange, alphabet) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = alphabet + (i + 1).toString();
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
            heat_map_series: [],
            total_electrical_usage: [541541],
            total_non_electrical_usage: [326],
            theme_colors: ['#1e88e5', '#00acc1', '#fc4b6c', '#7460ee', '#1d2126'],
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
            tree_map: {
                series: [
                    {
                        data: [
                            {
                                x: 'Nimbus Center',
                                y: 44,
                            },
                            {
                                x: 'Main uilding',
                                y: 55,
                            },
                            {
                                x: 'Rubicon Center',
                                y: 13,
                            },
                            {
                                x: 'Student Center',
                                y: 43,
                            },
                            {
                                x: 'Melbourne Building',
                                y: 23,
                            },
                            {
                                x: 'Tourism Building',
                                y: 30,
                            },
                            {
                                x: 'Admin Building',
                                y: 24,
                            },
                            {
                                x: 'Create Building',
                                y: 42,
                            },
                        ]
                    }
                ],
                chartOptions: {
                    legend: {
                      show: false
                    },
                    chart: {
                      height: 250,
                      type: 'treemap'
                    },
                    colors: [
                      '#3B93A5',
                      '#F7B844',
                      '#ADD8C7',
                      '#EC3C65',
                      '#CDD7B6',
                      '#C1F666',
                      '#D43F97',
                      '#1E5D8C',
                    ],
                    plotOptions: {
                      treemap: {
                        distributed: true,
                        enableShades: false
                      }
                    }
                  },
            },
            heat_map_energy: {
                series: [{
                    // name: '2013',
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
                    },
                    yaxis: {
                        labels: {
                            show: false,
                        }
                    } 
                },
            
            },

        }
    },
    methods: {
    },
    computed: {
        ...mapGetters({buildings_data: "getBuildingData"}),
        ...mapGetters(["getKpiType", "getPeriod", "getTimelineTracker"]),
        heatMapSeries() {
            let current_date = new Date()
            let track_date = new Date(this.getTimelineTracker.date)
            console.log((current_date.getFullYear() - track_date.getFullYear()))
            let count, a
            console.log(this.getPeriod)
            switch(this.getPeriod) {
                case "Daily":
                    count = (current_date.getTime() - track_date.getTime())/(1000*60*60*24)
                    a = 'd'
                    break;
                case "Weekly":
                    count = Math.round((current_date - track_date)/(7*24*60*60*1000))
                    a = 'w'
                    break;
                case "Monthly":
                    count = (((current_date.getFullYear() - track_date.getFullYear())*12) - current_date.getMonth()) + track_date.getMonth()
                    a = 'm'
                    break;
                case "Yearly":
                    count = (current_date.getFullYear() - track_date.getFullYear())
                    a = 'y'
                    break;
            }
            let tmp_count = 0
            if(count>18)
                tmp_count = 18
            else
                tmp_count = count
            this.heat_map_series = []
            for(let i = 0; i < tmp_count; i++) {
                this.heat_map_series.push({
                    data: generateDataHeatMap(tmp_count, {
                        min: 0,
                        max: 90
                    }, a)
                })
            }

            console.log(this.heat_map_series)
            return this.heat_map_series   
        }
    },
    created() {
        this.heatMapSeries
    }
}
