import { mapGetters } from 'vuex'

export default {
    props: [
        "building_data",
        "transaction_data"
    ],
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
            rules: [
              value => !!value || "Required.",
              value => (value && value.length >= 3) || "Min 3 characters"
            ],
            select: null,
            items: ["India", "United Kingdom", "Africa", "California"],
        };
    },
    computed: {
        ...mapGetters({buildings: "getBuildingData"})
    }
}