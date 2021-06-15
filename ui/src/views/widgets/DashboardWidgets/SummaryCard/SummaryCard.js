import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            from_period: '',
            to_period: '',
            items: [],
            icons: [
                "mdi-arrow-down-bold",
               "mdi-arrow-up-bold"
            ],
            total_electrical_usage: [541541],
            total_non_electrical_usage: [554],
        }
    },
    methods: {
        populateData() {
            this.from_period = this.summary_card_data.filter(data => data.key == "from_period")
            this.to_period = this.summary_card_data.filter(data => data.key == "to_period")
            this.items.push({name: 'Gas', key: "Wh", color: this.gas_value[2], icon: this.gas_value[3]})
            this.items.push({name: 'Electricity', key: "mA",color: this.electricity_value[2], icon: this.electricity_value[3]})
            this.items.push({name: 'Water', key: "L", color: this.water_value[2], icon: this.water_value[3]})
            this.items.push({name: 'Carbon Dioxide', key: "Kg", color: this.co_value[2], icon: this.co_value[3]})
            this.items.push({name: 'Total Electrical Usage'})
            this.items.push({name: 'Total Non-Electrical Usage'})
        },
    },
    computed: {
        ...mapGetters({ summary_card_data: "getDashboardData"} ),
        ...mapGetters({gas_value: 'getGasValue'}),
        ...mapGetters({electricity_value: 'getElectricityValue'}),
        ...mapGetters({co_value: 'getCoValue'}),
        ...mapGetters({water_value: 'getWaterValue'}),
    },
    mounted() {
        this.populateData()
    },
    // created() {
    //     this.populateData()
    // }
}