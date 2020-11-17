import { mapGetters } from "vuex";

export default {
    props: [
        "building_data"
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
            transaction_data: []
        };
    },
    methods: {

    },
    computed: {
        ...mapGetters({buildings: 'getBuildingData'})
    },
    created() {
        this.buildings.map(building => {
            this.buildings.push( {
                "transaction_id": building.id,
                "name": building.name,
                "address": building.address,
                "ufa": building.floor_area,
                "mhf": building.fuel,
                "ber": building.ber,
                "doi": building.issue,
                "expiry":  building.expiry,
                "assessor": building.assessor,
                "band": building.band,
                "category": building.category,
                "dec_id": building.dec_id
            })
        })
    }
}