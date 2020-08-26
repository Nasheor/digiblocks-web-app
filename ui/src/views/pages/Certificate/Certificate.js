import BuildingCard from '.././../sections/BuildingCard/index.vue'
import CertificateModal from './CertificateModal/index.vue'
import CommunityModal from './CommunityModal/index.vue'
import chartData from './energyData.js'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            name: '',
            band: 'B1',
            dialog: false,
            data: chartData,
            community_dialog: false,
        };
    },
    components: {
        BuildingCard,
        CertificateModal,
        CommunityModal,
    },
    methods: {
        open() {
            this.community_dialog = true;
        },
        setData(i) {
            this.name = this.building_data[i].name;
            localStorage.setItem('band', this.band);
            localStorage.setItem('rating', '149.1' );
        }
    },
    computed: {
        ...mapGetters({ building_data: "getBuildingData"})
    }
}