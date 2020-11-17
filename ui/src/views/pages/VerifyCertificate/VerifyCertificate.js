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
              ],
              buildings: []
        };
    },
    computed: {
      ...mapGetters({building_data: 'getBuildingData'}),
      ...mapGetters({email: "getEmail"}),

      getBuildings() {
        return this.buildings;
      }
    },
    methods: {
      async accept(item) {
        let body = {
          "assessor": this.email,
          "certificate_verified": true,
        }
        let payload = {
          "id": item.dec_id,
          "body": body
        }

        this.$store.dispatch("UPDATE_DEC", payload)
        let index = 0
        this.buildings.map((building, i) => {
          if(building.id === item.id) {
            index = i
          }
        });
        confirm("Are you sure you want to verify this certificate?") &&
          this.buildings.splice(index, 1);
        this.$store.commit("clearData")
        this.$router.push({name: "Login"})
        location.reload(); 
      },
      async deleteCertificate(item) {
        let body = {
          "assessor": "Rejected by "+this.email,
          "certificate_verified": false,
        }
        let payload = {
          "id": item.dec_id,
          "body": body
        }
        this.$store.dispatch("UPDATE_DEC", payload)
        let index = 0
        this.buildings.map((building, i) => {
          if(building.id === item.id) {
            index = i
            this.buildings[i].assesor = "Rejected by "+this.email 
          }
        });
        confirm("Are you sure you want to cancel this certificate?") &&
          this.buildings.splice(index, 1);
        this.$store.commit("clearData")
        this.$router.push({name: "Login"})
        location.reload(); 
      },
    },
    created() {
      this.building_data.map(building => {
        if(building.assessor === "Not Verified" && building.certificate_verified === false)
          this.buildings.push( {
            "id": building.id,
            "name": building.name,
            "address": building.address,
            "ufa": building.floor_area,
            "mhf": building.fuel,
            "ber": building.ber,
            "doi": building.issue,
            "expiry":  building.expiry,
            "assessor": building.assessor,
            "band": building.band,
            "category": building.category,
            "dec_id": building.dec_id
          })
      })
    }
}