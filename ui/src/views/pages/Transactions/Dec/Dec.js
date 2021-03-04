import { mapGetters } from "vuex";

export default {
    data() {
        return {
            headers: [
                {
                text: "Name",
                align: "start",
                sortable: false,
                value: "name"
                },
                { text: "Transaction_id", value: "transaction_id" },
                { text: "Address", value: "address" },
                { text: "Useful Floor Area", value: "ufa" },
                { text: "Main Heating Fuel", value: "mhf" },
                { text: "BER Number", value: "ber" },
                { text: "DOI", value: "doi" },
                { text: "Expiry", value: "expiry" },
                { text: "Assessor", value: "assessor" },
                { text: "Band", value: "band" },
                { text: "Category", value: "category" },
            ],
            // this.dec.environment, this.dec.hours, this.dec.total_useful_floor_area, 
            // this.dec.sales_floor_area, this.dec.net_lettable_aream, this.dec.electricity_energy_use,
            // this.dec.electricity_energy_unit, this.dec.fossil_use, this.dec.fossil_type,
            // this.dec.fossil_unit, this.dec.year
            meta_data: [
                {
                    "key": "Environment",
                    "value": "Heating and Natural Ventilation" 
                },
                {
                    "key": "Hours",
                    "value": "1500" 
                },
                {
                    "key": "Total Useful Floor Area in meters",
                    "value": "1200" 
                },
                {
                    "key": "Sales Floor Area",
                    "value": "0" 
                },
                {
                    "key": "Net Lettable Area",
                    "value": "0" 
                },
                {
                    "key": "Fossil Type",
                    "value": "Natural Gas" 
                },

            ],
            model: 1,
            meta_status: false, 
            transactions: [],
            reverse: false,
            tab: null,
            activity: null,
            profile: null,
            settings: null,
            valueDeterminate: 80,
            valueDeterminate2: 90,
            valueDeterminate3: 50,
            valueDeterminate4: 70,
            rules: [
              value => !!value || "Required.",
              value => (value && value.length >= 3) || "Min 3 characters"
            ],
            select: null,
            items: ["India", "United Kingdom", "Africa", "California"],
            icons: ["mdi-star", "mdi-book-variant", "mdi-airballoon", "mdi-buffer"]
        };
    },
    methods: {

    },
    computed: {
        ...mapGetters({buildings: 'getBuildingData'}),
        ...mapGetters({transaction_data: 'getTransactionData'}),
    },
    created() {
        console.log(this.transaction_data)
    }
}