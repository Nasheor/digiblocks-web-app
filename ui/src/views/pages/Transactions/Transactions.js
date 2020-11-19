import { mapGetters } from 'vuex'
import BuildingCard from '../../sections/BuildingCard/index'
import Dec from './Dec/index'
import Registration from './Registration/index'

export default {
    components: {
    BuildingCard,
    Dec,
    Registration,
},
data() {
    return {
        selected_building:[],
        dialog: false,
        transactions: [],
        views: [
            {
                'name': 'Dec',
                'icon': 'mdi-newspaper'
            }, 
            {
                'name': 'Asset Registration',
                'icon': 'mdi-chart-bar'
            }
        ],
        tab: null,
    };
},
computed: {
    ...mapGetters({buildings: 'getBuildingData'}),
    getBuildings() {
        return this.selected_building
    }
},
methods: {
    setName(b) {
        this.selected_building.push({
            "transaction_id": b.id,
            "name": b.name,
            "address": b.address,
            "ufa": b.floor_area,
            "mhf": b.fuel,
            "ber": b.ber,
            "doi": b.issue,
            "expiry": b.expiry,
            "assessor": b.assessor,
            "band": b.band,
            "category": b.category,
        })
        this.$store.dispatch("TRACE_DEC", b.id).then(result => {
            this.transactions = result
        })
    },
}
}