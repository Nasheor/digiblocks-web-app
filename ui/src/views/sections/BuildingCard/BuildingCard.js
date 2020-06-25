import BCard from '../../widgets/BuildingCardComponents/index.vue' 

export default {
    components: {
        BCard,
    },
    data() {
        return {
            show: false,
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
        };
    },
    methods: {
        deleteBuilding() {

        },
    }
}