import { mapGetters } from 'vuex'

export default {
    props: ["building_data"],
    data() {
        return {
            address: this.building_data.address,
            category: this.building_data.category,
            dec_category: this.building_data.dec_category,
            devices: this.building_data.devices,
            environment: this.building_data.environment,
            fuel: this.building_data.fuel,
            floor_area: this.building_data.floor_area
        }
    },
    methods: {
        closeEditForm() {
            this.$store.commit("setEditFormStatus", false)
            this.$router.push({name: "Home"})
        },
        async saveFormDetails() {
            let payload = {
                "body": {
                    "dlt_status": false,
                    "dlt_cert_status": false,
                    "assessor": "Not Verified",
                },
                "id": this.building_data.dec_id
            }
            this.$store.dispatch("UPDATE_DEC", { "body": payload.body, "id": payload.id }).then(tb => {
                console.log(tb);                     
            })

            payload = {
                "body": {
                    "address": this.address,
                    "category": this.category,
                    "dec_category": this.dec_category,
                    "devices": this.devices,
                    "environment": this.environment,
                    "main_fuel": this.main_fuel,
                    "total_useful_floor_area": this.floor_area,
                },
                "id": this.building_data.id
            }
            this.$store.dispatch("UPDATE_ASSET_STATUS", {"body": payload.body, "id": payload.id}).then(tb => {
                console.log(tb);                
            })
            confirm("Login to see changes.")      
        }
    },
    computed: {
        ...mapGetters(['getBuildingData','getEditFormStatus']),
    },
    created() {

    }
}