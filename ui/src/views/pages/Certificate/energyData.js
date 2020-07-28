const themeColors = ['#1d913d','#1d913d','#1d913d', '#30ab52', '#30ab52',
                     '#30ab52', '#5fd47f', '#5fd47f', '#5fd47f', '#f5e749', 
                     '#f5e749', '#e8b53f', '#e8b53f','#de8e26', '#d95b18' ]

export default {
    barChart: {
        series: [{
            name: 'Data',
            data: [0.5, 1.7, 17, 25, 33.5, 42, 50, 58.5, 67, 75, 87.5, 100, 112.5, 125, 150]
        }],
        chartOptions: {
            title: {
                text: 'Building Energy Rating (Indicator)',
                display: true,
                align: 'left',
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                  fontSize:  '14px',
                  fontWeight:  'bold',
                  fontFamily:  undefined,
                  color:  '#263238',
                },
            },
            chart: {
                id: "Certificate",
                width: '100%',
                height: 350,
            },
            colors: themeColors,
            plotOptions: {
                bar: {
                    horizontal: true,
                    distributed: true,
                    endingShape: 'rounded',
                    columnWidth: '100%',
                    barHeight: '90%',
                },

            },
            dataLabels: {
                enabled: true,
                offsetX: 70,
                background: {
                    enabled: true,
                    forecolor: "white",
                    borderColor: "pink",
                    opacity: 3,
                },
                formatter: function (val, opt) {
                if (opt.w.globals.labels[opt.dataPointIndex] === localStorage.getItem('band')) {
                    return opt.w.globals.labels[opt.dataPointIndex] + ": "+localStorage.getItem('rating');
                    }
                },
                style: {
                    colors: ['black']
                }
            },
            xaxis: {
                categories: ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1',
                    'C2', 'C3', 'D1', 'D2', 'E1', 'E2', 'F', 'G'
                ],
                labels: {
                    style: {
                        cssClass: 'grey--text lighten-2--text fill-color',
                    }
                },
                forceNiceScale: true,
                title: {
                    text: 'High ENERGY USE',
                    offsetX: 0,
                    offsetY: -10,
                    style: {
                        color: undefined,
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
            },
            yaxis: {
                labels: {
                    show: false,
                    minWidth: 40,
                    style: {
                        cssClass: 'grey--text lighten-2--text fill-color',
                    }
                },
                forceNiceScale: true,
                title: {
                    text: 'Low ENERGY USE',
                    offsetX: 0,
                    offsetY: -330,
                    style: {
                        color: undefined,
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
            },
            grid: {
                borderColor: 'rgba(0,0,0,0.1)'
            },
            tooltip: {
                theme: "dark"
            }
        }
    },
}