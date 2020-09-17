import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            from_period: '',
            to_period: '',
            items: [],
        }
    },
    methods: {
        populateData() {
            this.from_period = this.summary_card_data.filter(data => data.key == "from_period")
            this.to_period = this.summary_card_data.filter(data => data.key == "to_period")
            this.items.push({name: 'Gas', key: "Wh"})
            this.items.push({name: 'Electricity', key: "mA"})
            this.items.push({name: 'Water', key: "L"})
            this.items.push({name: 'Carbon Dioxide', key: "Kg"})
        },
    },
    computed: {
        ...mapGetters({ summary_card_data: "getDashboardData"} ),
        ...mapGetters({gas_value: 'getGasValue'}),
        ...mapGetters({electricity_value: 'getElectricityValue'}),
        ...mapGetters({co_value: 'getCoValue'}),
        ...mapGetters({water_value: 'getWaterValue'}),
    },
    created() {
        this.populateData()
    }
}