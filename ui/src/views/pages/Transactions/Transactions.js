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
        dialog: false,
        transactions_dec: [],
        transactions_asset: [],
        views: [
            {
                'name': 'Dec',
                'icon': 'mdi-newspaper'
            }, 
            // {
            //     'name': 'Asset Registration',
            //     'icon': 'mdi-chart-bar'
            // }
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
    async setName(b) {
        let payload_dec = {
            "params": {
                fcn: "traceDEC",
                chainCodeName: "deccontract",
                channelName: "mychannel",
                args: `["${b.dec_id}"]`
            },
        }

        let payload_asset = {
            "params" :{
                fcn: "traceAsset",
                chainCodeName: "identitycontract",
                channelName: "mychannel",
                args: `["${b.id}"]`
            }
        }
        console.log(payload_asset)
        this.$store.dispatch("TRACE_DEC", payload_dec).then(result => {
            this.transactions_dec = result.result
            console.log(this.transactions_dec)
            this.$store.commit("setTransactionData", this.transactions_dec);
        }).then(r => {
            this.$store.dispatch("TRACE_ASSET", payload_asset).then(result => {
                this.transactions_asset = result.result
                console.log(this.transactions_asset)
                this.$store.commit("setAssetTransactionData", this.transactions_asset)
            })
        })
    },
}
}