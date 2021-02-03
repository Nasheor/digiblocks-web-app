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