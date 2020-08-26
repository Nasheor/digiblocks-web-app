import { mapGetters } from 'vuex'

export default {
    data() {
        return {
          center: { lat: 51.886136, lng: -8.535202 },
          markers: [],
          places: [],
          currentPlace: null,
          headers: ["Name", "Band"],
          campus_data: [],
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

            })
          })
        },
        populateMarkers() {
          this.building_data.map(building => {
            this.markers.push({
              "position": {
                "lat": parseFloat(building.latitude),
                "lng": parseFloat(building.longitude)
              }
            })
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