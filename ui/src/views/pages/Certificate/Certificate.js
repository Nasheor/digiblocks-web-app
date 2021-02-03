import BuildingCard from '.././../sections/BuildingCard/index.vue'
import CertificateModal from './CertificateModal/index.vue'
import CommunityModal from './CommunityModal/index.vue'
import Dec from '../Transactions/Dec/index'
import Registration from '../Transactions/Registration/index'
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
            history: false,
            dialog: false,
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
            transactions_dec: []
        };
    },
    components: {
        BuildingCard,
        CertificateModal,
        CommunityModal,
        Dec,
        Registration,
    },
    methods: {
        open() {
            this.community_dialog = true;
        },
        setData(building) {
            this.selected_building = building
            this.certificate_keys = building.certificate_keys.split(",")
        },
        async openCertHistory() {
            this.history = true
            this.$store.commit("setHistoryStatus", true)
            console.log("DEC ID:"+this.selected_building.dec_id)
            let payload_dec = {
                "params": {
                    fcn: "traceDEC",
                    chainCodeName: "deccontract",
                    channelName: "mychannel",
                    args: `["${this.selected_building.dec_id}"]`
                },
            }   
            console.log(payload_dec)
            this.$store.dispatch("TRACE_DEC", payload_dec).then(result => {
                this.transactions_dec = result.result                
                console.log(this.transactions_dec)
                this.$store.commit("setTransactionData", this.transactions_dec);
            })

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
        close() {
            this.$store.commit("setHistoryStatus", false)
            this.$router.push({name: "Home"})
        }
    },
    computed: {
        ...mapGetters({ building_data: "getBuildingData"}),
        ...mapGetters({ role: "getRole"}),
        ...mapGetters({ email: "getEmail"}),
        ...mapGetters(["getHistoryStatus"]),
        getSelectedBuilding() {
            return this.selected_building
        },
        getCertHistory() {
            return this.history
        }
    }
}