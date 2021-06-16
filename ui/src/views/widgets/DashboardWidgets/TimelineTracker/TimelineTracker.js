export default {
    data() {
        return {
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
        }
    },
    methods: {
        setTimeline() {
            this.$refs.menu.save(this.date)
            this.$store.commit("setTimeline", this.date)
        }
    }
}