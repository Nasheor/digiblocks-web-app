import { mapGetters } from "vuex"

export default {
    data() {
        return {
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            types: [
                "Gas",
                "Water",
                "Electricity",
                "Carbon Dioxide"
            ],
            period: [
                "Daily",
                "Weekly",
                "Monthly",
                "Yearly"
            ],
            selected_type: "",
            selected_period: "",
        }
    },
    methods: {
        setTimeline() {
            this.$refs.menu.save(this.date)
            this.$store.commit("setTimeline", this.date)
        },
        setKpi(item) {
            this.$store.commit("setKpiType", item)
        },
        setPeriod(item) {
            this.$store.commit("setPeriod", item)
        }
    },
    computed: {
        ...mapGetters(["getKpiType", "getPeriod", "getTimelineTracker"])
    },
    created() {
        this.date = this.getTimelineTracker.date
    }
}