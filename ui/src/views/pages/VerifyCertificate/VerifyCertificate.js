import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            headers: [
                {
                  text: "Name",
                  align: "start",
                  sortable: false,
                  value: "name"
                },
                { text: "Address", value: "address" },
                { text: "Useful Floor Area", value: "ufa" },
                { text: "Main Heating Fuel", value: "mhf" },
                { text: "BER Number", value: "ber" },
                { text: "DOI", value: "doi" },
                { text: "Expiry", value: "expiry" },
                { text: "Assessor", value: "assessor" },
                { text: "Band", value: "band" },
                { text: "Category", value: "category" },
                {text: "Verify", value: "actions"},
                // {text: "Decline", value: "decline"}
              ],
              buildings: []
        };
    },
    computed: {
      ...mapGetters({building_data: 'getBuildingData'}),
      ...mapGetters({email: "getEmail"})
    },
    methods: {
      async accept(id) {
        console.log()
        let body = {
          "assessor": this.email
        }
        let payload = {
          "id": id,
          "body": body
        }
        this.$store.dispatch("UPDATE_ASSET_STATUS", payload)
        let index = 0
        this.buildings.map((building, i) => {
          if(building.id === id) {
            index = i
          }
        });
        confirm("Are you sure you want to cancel this item?") &&
          this.buildings.splice(index, 1);
      },
      deleteCertificate(id) {
        let index = 0
        this.buildings.map((building, i) => {
          if(building.id === id) {
            index = i
          }
        });
        console.log(index)
        confirm("Are you sure you want to cancel this item?") &&
          this.buildings.splice(index, 1);
      },
    },
    created() {
      this.building_data.map(building => {
        if(building.assessor === "Not Verified")
          this.buildings.push( {
            id: building.id,
            name: building.name,
            address: building.address,
            ufa: building.floor_area,
            mhf: building.fuel,
            ber: building.ber,
            doi: building.issue,
            expiry:  building.expiry,
            assessor: building.assessor,
            band: building.band,
            category: building.category,
          })
      })
    }
}