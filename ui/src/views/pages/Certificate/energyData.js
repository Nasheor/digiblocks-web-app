const themeColors = ['#1d913d','#1d913d','#1d913d', '#30ab52', '#30ab52',
                     '#30ab52', '#5fd47f', '#5fd47f', '#5fd47f', '#f5e749', 
                     '#f5e749', '#e8b53f', '#e8b53f','#de8e26', '#d95b18' ]
export default {
    barChart: {
        series: [{
            data: [0.5, 1.7, 17, 25, 33.5, 42, 50, 58.5, 67, 75, 87.5, 100, 112.5, 125, 150]
        }],

        chartOptions: {
            chart: {
                width: '100%',
                height: 350
            },
            colors: themeColors,
            plotOptions: {
                bar: {
                    horizontal: true,
                },

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
            },
            yaxis: {
                labels: {
                    style: {
                        cssClass: 'grey--text lighten-2--text fill-color',
                    }
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