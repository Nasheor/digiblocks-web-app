export default {
  props: [
    "building_data",
  ],
  data() {
    return {
      zoom: 17,
      center: [ -8.533763936897916, 51.88524466008951],
      rotation: 0,
      marker: '',
    }
  }
};