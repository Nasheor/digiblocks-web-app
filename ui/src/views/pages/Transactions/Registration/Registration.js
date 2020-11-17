import { mapGetters } from 'vuex'

export default {
    props: [
        "building_data"
    ],
    computed: {
        ...mapGetters({buildings: "getBuildingData"})
    }
}