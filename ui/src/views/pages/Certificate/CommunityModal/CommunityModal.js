import VueApexCharts from 'vue-apexcharts'
import { mapGetters } from 'vuex'

export default {
    components: {
        VueApexCharts,
    },
    props: ["chartData"],
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
                { text: "Assessor", value: "assessor" }
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
          ufa: building.floor_area,
          mhf: building.fuel,
          ber: building.ber,
          doi: building.issue,
          expiry:  building.expiry,
          assessor: building.assessor
        })
      })
    }
}