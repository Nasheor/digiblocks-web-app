import { mapGetters } from 'vuex'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {
    components: {
      LMap,
      LTileLayer,
      LMarker,
    },
    data() {
        return {
          markers: [],
          headers: ["Name", "Band"],
          campus_data: [],
          zoom: 17,
          center: [51.885297, -8.534519],
          rotation: 0,
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
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
        ...mapGetters({building_data: "getBuildingData"}),
        getCampusData() {
          return this.campus_data
        },
        getMarkers() {
          return this.markers
        }
      },
      // watch: {
      //   markers: function() {
      //     this.building_data.map(building => {
      //       this.campus_data.push({
      //         "name": building.name,
      //         "category": building.category,
      //         "image": building.image,
      //         "band": building.band,
      //         "color": building.color

      //       })
      //     })          
      //   },
      //   campus_data: function() {
      //     this.building_data.map(building => {
      //       this.campus_data.push({
      //         "name": building.name,
      //         "category": building.category,
      //         "image": building.image,
      //         "band": building.band,
      //         "color": building.color

      //       })
      //     })          
      //   }
      // },
      // beforeCreate(){
      //   this.populateMarkers()
      //   this.populateTable()
      // }
      async created() {
        this.populateMarkers()
        this.populateTable()
      }
}