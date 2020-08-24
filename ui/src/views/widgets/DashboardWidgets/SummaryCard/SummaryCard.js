export default {
    props: [
        'summary_card_data'
    ],
    data() {
        return {
            from_period: '',
            to_period: '',
            gas: '',
            electricity: '',
            water: '',
            co2: '',
            items: []
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
            this.items.push({name: 'Gas(Wh)', measurement: this.gas})
            this.items.push({name: 'Electricity(mA)', measurement: this.electricity})
            this.items.push({name: 'Water(L)', measurement: this.water})
            this.items.push({name: 'Carbon Dioxide(Kg)', measurement: this.co2})
        },
    },
    mounted() {
        this.populateData()
    }
}