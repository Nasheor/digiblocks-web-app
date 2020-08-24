export default {
    data() {
        return {
          // default to Montreal to keep it simple
          // change this to whatever makes sense
          center: { lat: 51.886136, lng: -8.535202 },
          markers: [{
            position: {
              lat: 51.8851366,
              lng: -8.537603
            },
          }, 
          {
            position:{
              lat:51.8865029,
              lng:-8.535737799999998
            }
          },
          {
            position:{
              lat:51.8863186,
              lng:-8.535412899999999
            }
          },
          {
            position:{
              lat:51.886229,
              lng:-8.533397
            }
          }],
          places: [],
          currentPlace: null
        };
      },
    
      mounted() {
        this.geolocate();
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
        geolocate: function() {
          navigator.geolocation.getCurrentPosition(position => {
            this.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
          });
        }
      }
}