import EditBuildingForm from '../../EditBuilding/index'
import { mapGetters } from 'vuex'

export default {
  props: [
    "building_data",
  ],
  components: {
    EditBuildingForm,
  },
  data() {
    return {
      zoom: 17,
      center: [ -8.533763936897916, 51.88524466008951],
      rotation: 0,
      marker: '',
    }
  },
  computed: {
    ...mapGetters(["getRole", "getEditFormStatus", "getDltStatus"])
  },
  methods: {
      setEditFormStatus() {
        this.$store.commit("setEditFormStatus", true)
    },
  //   async registerBuilding() {
  //     let building_data;
  //     this.getBuildingData.map(building => {
  //         if (building.name === this.name) {
  //             building_data = building
  //         }
  //     })
  //     console.log(building_data)
  //     if(building_data.dlt_status === true) {
  //         confirm("Building already registered to the ledger!")
  //         return 
  //     }

  //     let status = "Approved"
  //     console.log(building_data)
  //     this.$store.dispatch("REGISTER_ASSET", {
  //         "fcn": "createAsset",
  //         "peer": ["peer0.org1.digiblocks.com", "peer0.org2.digiblocks.com"],
  //         "chaincodeName":"identitycontract",
  //         "channelName" : "mychannel",
  //         "args": [building_data.id, building_data.category, status, `{\"environment\": \"${building_data.environment}\",\"name\": \"${building_data.name}\",\"main_fuel\": \"${building_data.fuel}\"}`
  //         ]
  //     }).then(result => {
  //         console.log(result)
  //     })
  //     let payload = {
  //         "body": {
  //             "dlt_status": true
  //         },
  //         "id": building_data.id
  //     }
  //     console.log(building_data)
  //     this.$store.dispatch("UPDATE_ASSET_STATUS", {"body": payload.body, "id": payload.id}).then(tb => {
  //         this.register_building = true
  //         building_data.dlt_status = true
  //         this.dlt_status = true                   
  //     })
  //     confirm("Ledger Registration ID: "+building_data.id+".")
  //   }
  }
};