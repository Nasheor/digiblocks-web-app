import { mapGetters } from "vuex";

export default {
    props: [
        "building_data",
        "transaction_data"
    ],
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
            transactions: []
        };
    },
    methods: {

    },
    computed: {
        ...mapGetters({buildings: 'getBuildingData'})
    },
}