import Vue from 'vue'
import Vuex from 'vuex'
import ThingsboardController from  './views/controller/thingsboardController'

Vue.use(Vuex)
localStorage.setItem('isAdmin', false);

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    buildings: [{
        'name': "Main Building",
        'src': "cit.jpg"
      },
      {
        'name': "Rubicon Center",
        'src': "rubicon.jpeg"                    
      },
      {
        'name': "Nimbus Research Center",
        'src': "nimbus.jpg"                    
      },
      {
        'name': "Melbourne Building",
        'src': "melbourne.jpeg"                    
      },
      {
        'name': "Student Center",
        'src': "student_center.jpeg"                    
      },
      {
        'name': "Create Building",
        'src': "create.jpeg"                    
      },
      {
        'name': "Tourism Building",
        'src': "tourism.jpeg"                    
      },
      {
        'name': "Admin Building",
        'src': "admin.jpeg"                    
    }],
    compare_buildings: [], 
    compare_dialog_status: false,
    admin: localStorage.getItem('isAdmin'),
    asset_data: [],
    dashboard_data: []
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
    setAssetData(state, payload) {
      state.asset_data = payload;
    }
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
    getBuildings(state) {
      return state.buildings;
    },
    getDashboardData(state) {
        let dashboard_asset = state.asset_data.filter(asset => asset.type === "DASHBOARD")
        console.log(dashboard_asset);
        state.dashboard_data = ThingsboardController.getDashboardData(dashboard_asset[0].id)
        return state.dashboard_data;
    }
  },
})
