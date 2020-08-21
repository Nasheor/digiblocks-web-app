import { mapGetters } from 'vuex'

export default {
name: 'DashboardDashboard',

    data () {
        return {
        dailySalesChart: {
            data: {
            labels_weather: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
            time: 0,
            forecast: [
            { day: 'Tuesday', icon: 'mdi-white-balance-sunny', temp: '24\xB0/12\xB0' },
            { day: 'Wednesday', icon: 'mdi-white-balance-sunny', temp: '22\xB0/14\xB0' },
            { day: 'Thursday', icon: 'mdi-cloud', temp: '25\xB0/15\xB0' },
            ],
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [12, 17, 7, 17, 23, 18, 38],
            ],
            },
            options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
                tension: 0,
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            },
            },
        },
        dataCompletedTasksChart: {
            data: {
            labels: ['12', '3', '6', '9', '13', '14', '15', '16'],
            series: [
                [230, 750, 450, 300, 280, 240, 200, 190],
            ],
            },
            options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
                tension: 0,
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            },
            },
        },
        monthlyEnergySavings: {
            data: {
            labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
            series: [
                [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 1000],

            ],
            },
            options: {
            axisX: {
                showGrid: false,
            },
            low: 0,
            high: 1000,
            chartPadding: {
                top: 0,
                right: 5,
                bottom: 0,
                left: 0,
            },
            },
            responsiveOptions: [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                labelInterpolationFnc: function (value) {
                    return value[0]
                },
                },
            }],
            ],
        },
        headers: [
            {
                sortable: true,
                text: 'ID',
                value: 'id',
            },
            {
                sortable: true,
                text: 'Names',
                value: 'name',
            },
            {
                sortable: true,
                text: 'Revenue',
                value: 'salary',
                align: 'right',
            },
            {
                sortable: true,
                text: 'Country',
                value: 'country',
                align: 'right',
            },
            {
                sortable: true,
                text: 'Location',
                value: 'city',
                align: 'right',
            },
        ],
        items: [
            {
                id: 1,
                name: 'Simpsons house',
                country: 'Ireland',
                city: 'Cork',
                salary: '$35,738',
            },
            {
                id: 2,
                name: 'Burns Manor',
                country: 'Curaçao',
                city: 'Sinaai-Waas',
                salary: '$23,738',
            },
            {
                id: 3,
                name: 'Nuclear Plant',
                country: 'Netherlands',
                city: 'Overland Park',
                salary: '$56,142',
            },
            {
                id: 4,
                name: 'Krustylu studio',
                country: 'Korea, South',
                city: 'Gloucester',
                salary: '$38,735',
            },
            {
                id: 5,
                name: 'Kwike Mart',
                country: 'Malawi',
                city: 'Feldkirchen in Kārnten',
                salary: '$63,542',
            },
        ],
        tabs: 0,
        tasks: {
            0: [{

            }],
            1: [{
            
            }],
            2: [
            {
                text: 'Level-1',
                value: true,
            },
            {
                text: 'Level-2',
                value: true,
            },
            {
                text: 'Level-3"',
                value: true,
            },
            ],
        },
        list: {
            0: false,
            1: false,
            2: false,
        },
        labels_weather: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
        time: 0,
        forecast: [
            { day: 'Tuesday', icon: 'mdi-white-balance-sunny', temp: '24\xB0/12\xB0' },
            { day: 'Wednesday', icon: 'mdi-white-balance-sunny', temp: '22\xB0/14\xB0' },
            { day: 'Thursday', icon: 'mdi-cloud', temp: '25\xB0/15\xB0' },
        ],
        }
    },

    methods: {
        complete (index) {
            this.list[index] = !this.list[index]
            console.log(this.getDashboardData)
        },
    },
    computed: {
        ...mapGetters(['getDashboardData'])
    }
}
