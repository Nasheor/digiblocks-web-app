import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            reverse: false,
            tab: null,
            activity: null,
            profile: null,
            settings: null,
            valueDeterminate: 80,
            valueDeterminate2: 90,
            valueDeterminate3: 50,
            valueDeterminate4: 70,
            meta_status: false, 
            rules: [
              value => !!value || "Required.",
              value => (value && value.length >= 3) || "Min 3 characters"
            ],
            select: null,
            items: ["India", "United Kingdom", "Africa", "California"],
            icons: ["mdi-star", "mdi-book-variant", "mdi-airballoon", "mdi-buffer"]
        };
    },
    computed: {
        ...mapGetters({buildings: "getBuildingData"}),
        ...mapGetters({transaction_data: 'getTransactionsAssetData'}),
    }
}