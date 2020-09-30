import { mapGetters } from 'vuex'

export default {
    data() {
        return {
          markers: [],
          headers: ["Name", "Band"],
          campus_data: [],
          zoom: 17,
          center: [ -8.533763936897916, 51.88524466008951],
          rotation: 0,
        };
      },  
      methods: {
        // receives a place object via the autocomplete component
        setPlace(place) {
          this.currentPlace = place;
        },
        addMarker() {
          if (this.currentPlace) {
            const marker = {
              lat: this.currentPlace.geometry.location.lat(),
              lng: this.currentPlace.geometry.location.lng()
            };
            this.markers.push({ position: marker });
            this.places.push(this.currentPlace);
            this.center = marker;
            this.currentPlace = null;
          }
        },
        populateTable() {
          this.building_data.map(building => {
            this.campus_data.push({
              "name": building.name,
              "category": building.category,
              "image": building.image,
              "band": building.band,
              "color": building.color

            })
          })
        },
        populateMarkers() {
          this.building_data.map(building => {
            this.markers.push(building.coordinates)
          })
        }
      },
      computed: {
        ...mapGetters({building_data: "getBuildingData"})
      },
      created() {
        this.populateMarkers()
        this.populateTable()
      }
}