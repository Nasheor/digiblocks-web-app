import BuildingCard from '.././../sections/BuildingCard/index.vue'
import CertificateModal from './CertificateModal/index.vue'
import CommunityModal from './CommunityModal/index.vue'
import chartData from './energyData.js'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            name: '',
            id: '',
            band: 'B1',
            dialog: false,
            data: chartData,
            certificate_data: {},
            certificate_keys: [],
            community_dialog: false,
            certificate_key_data: [],
            selected_building: '',
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
        setData(building) {
            this.selected_building = building
            this.certificate_keys = building.certificate_keys.split(",")
        },
        verifyCert(){
            let body = {
                "assessor": this.email,
                "certificate_verified": true
              }
              let payload = {
                "id": this.selected_building.id,
                "body": body
              }
              this.$store.dispatch("UPDATE_ASSET_STATUS", payload)

              confirm("Are you sure you want to verify this certificate?");
        },
    },
    computed: {
        ...mapGetters({ building_data: "getBuildingData"}),
        ...mapGetters({ role: "getRole"}),
        ...mapGetters({ email: "getEmail"}),
        getSelectedBuilding() {
            return this.selected_building
        }
    }
}