import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            from_period: '',
            to_period: '',
            gas: '',
            electricity: '',
            water: '',
            co2: '',
            items: [],
            years: [], 
        }
    },
    methods: {
        populateData() {
            this.from_period = this.summary_card_data.filter(data => data.key == "from_period")
            this.to_period = this.summary_card_data.filter(data => data.key == "to_period")
            this.gas = this.summary_card_data.filter(data => data.key == "from_period_gas")
            this.summary_card_data.filter(data => {
                if (data.key == "to_period_gas") {
                    this.gas.push(data)
                }
            })
            this.electricity = this.summary_card_data.filter(data => data.key == "from_period_electricity")
            this.summary_card_data.filter(data => {
                if (data.key == "to_period_electricity") {
                    this.electricity.push(data)
                }
            })
            this.water = this.summary_card_data.filter(data => data.key == "from_period_water")
            this.summary_card_data.filter(data => {
                if (data.key == "to_period_water") {
                    this.water.push(data)
                }
            })
            this.co2 = this.summary_card_data.filter(data => data.key == "from_period_co2")
            this.summary_card_data.filter(data => {
                if (data.key == "to_period_co2") {
                    this.co2.push(data)
                }
            })
            this.items.push({name: 'Gas', measurement: this.gas, key: "Wh"})
            this.items.push({name: 'Electricity', measurement: this.electricity, key: "mA"})
            this.items.push({name: 'Water', measurement: this.water, key: "L"})
            this.items.push({name: 'Carbon Dioxide', measurement: this.co2, key: "Kg"})
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