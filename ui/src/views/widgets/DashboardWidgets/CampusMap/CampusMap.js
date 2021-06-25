import { mapGetters } from 'vuex'
import { LMap, LTileLayer, LMarker, LTooltip } from 'vue2-leaflet';

export default {
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LTooltip,
    },
    data() {
        return {
          headers: ["Name", "BER", "Electrical Usage"],
          zoom: 17,
          center: [51.885297, -8.534519],
          rotation: 0,
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          show_info: false,
          b_data: ''
        };
      },  
      computed: {
        ...mapGetters({building_data: "getBuildingData"}),
        ...mapGetters(["getKpiType"]),
        getHeaders() {
          this.headers = ["Name", "BER", this.getKpiType+" Usage"]
          return this.headers
        },
        getInfo() {
          return this.show_info;
        },
        getB() {
          return this.b_data
        }
      },
      methods: {
        showInfo(marker) {
          this.show_info = !this.show_info
          this.b_data = marker
        }
      },
      mounted: function() {
        // L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.3.4/dist/images/";
        // this.$nextTick(() => {
        //   this.markerObjects = this.$refs.markersRef.map(ref => ref.mapObject);
        // });
      },
}