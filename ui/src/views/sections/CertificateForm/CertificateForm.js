export default {
    data() {
        return {
            asset_name: '',
            asset_type: '',
            environment: '',
            doi: '',
            doe: '',
            ber: '',
            fuel: '',
            assessor: ''
        }
    },
    methods: {
        register_asset() {
            console.log(this.asset_name)
            this.$store.dispatch("REGISTER_ASSET", {
                "fcn": "createAsset",
                "peer": ["peer0.org1.digiblocks.com", "peer0.org2.digiblocks.com"],
                "chaincodeName":"identitycontract",
                "channelName" : "mychannel",
                "args": [this.asset_name, this.asset_type, {
                    "environment": this.environment,
                    "date_of_issue": this.doi,
                    "date_of_expiry": this.doe,
                    "ber": this.ber,
                    "fuel": this.fuel,
                    "assessor": this.assessor
                }]
            })
        }
    }
}