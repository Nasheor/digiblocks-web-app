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
                {text: "Band", value: "band"},
                {text: "Rating", value: "rating"}
              ],
              buildings: []
        };
    },
    computed: {
      ...mapGetters({building_data: 'getBuildingData'})
    },
    created() {
      this.building_data.map(building => {
        this.buildings.push( {
          name: building.name,
          address: building.address,
          ufa: building.floor_area[3].value,
          mhf: building.fuel,
          ber: building.ber,
          doi: building.issue,
          expiry:  building.expiry,
          assessor: building.assessor,
          band: building.band,
          rating: building.rating[0].key,
        })
      })
    }
}