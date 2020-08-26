import { mapGetters } from 'vuex'

export default {
    data() {
        return {
          // default to Montreal to keep it simple
          // change this to whatever makes sense
          center: { lat: 51.886136, lng: -8.535202 },
          markers: [],
          places: [],
          currentPlace: null
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
      }
}