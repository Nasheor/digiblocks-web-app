import { mapGetters } from 'vuex'
import BuildingCard from '../../sections/BuildingCard/index'

export default {
    components: {
    BuildingCard,
},
data() {
    return {
        id: '',
        name: '',
        selected_building:[],
        dialog: false,
        headers: [
        {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name"
        },
        { text: "Address", value: "address" },
        { text: "Useful Floor Area", value: "ufa" },
        { text: "Main Heating Fuel", value: "mhf" },
        { text: "BER Number", value: "ber" },
        { text: "DOI", value: "doi" },
        { text: "Expiry", value: "expiry" },
        { text: "Assessor", value: "assessor" },
        { text: "Band", value: "band" },
        { text: "Category", value: "category" },
        {text: "Verify", value: "actions"},
        ],
        transactions: [],
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
        this.name = b.name
        this.id = b.id
        this.selected_building = []
        this.buildings.map(building => {
            if(building.id === this.id)
                this.selected_building.push({
                    "id": building.id,
                    "name": building.name,
                    "address": building.address,
                    "ufa": building.floor_area,
                    "mhf": building.fuel,
                    "ber": building.ber,
                    "doi": building.issue,
                    "expiry": building.expiry,
                    "assessor": building.assessor,
                    "band": building.band,
                    "category": building.category,
                })
        })
    },
}
}