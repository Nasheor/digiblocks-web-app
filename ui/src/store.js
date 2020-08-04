import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
localStorage.setItem('isAdmin', false);

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    buildings: [],
    compare_buildings: [], 
    compare_dialog_status: false,
    admin: localStorage.getItem('isAdmin'),
  },
  mutations: {
    setPrivileges(state, payload) {
      state.admin = payload;
      localStorage.setItem("isAdmin", payload);
    },
    setBarImage (state, payload) {
      state.barImage = payload;
    },
    setDrawer (state, payload) {
      state.drawer = payload;
    },
    addBuildingToCompare(state, id) {
      // Get the entire building object from buildings
      state.compare_buildings.push(id); 
    },
    removeBuildingCompare(state, id) {
      state.compare_buildings = state.compare_buildings.filter(item => item != id); 
    },
    statusCompareDialog(state, payload) {
      state.compare_dialog_status = payload;
    },
   },
  getters: {
    getCompareBuildings(state) {
      return state.compare_buildings; 
    },
    getCompareDialogStatus(state) {
      return state.compare_dialog_status;
    },
    getPrivilegeStatus(state) {
      return state.admin;
    },
  },
})
