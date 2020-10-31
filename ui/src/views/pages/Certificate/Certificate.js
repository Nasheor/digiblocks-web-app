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
            // this.building_data[0].certificate_keys.map(key => {
            //     this.certificate_keys.push({"text": key.toUpperCase(), "value": key})
            // })
            this.building_data.map(building => {
                if(building.id === this.building_data[i].id) {
                    localStorage.setItem('band', building.band);
                    localStorage.setItem('rating', building.rating[0].value );
                    this.certificate_keys.map(item => {
                        Object.assign(this.certificate_data, {[item.value]: building[item.value]})
                    })
                }
            })
            this.name = this.building_data[i].name;
            this.id=this.building_data[i].id;
        }
    },
    computed: {
        ...mapGetters({ building_data: "getBuildingData"})
    }
}