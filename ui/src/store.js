import Vue from 'vue'
import Vuex from 'vuex'
import ThingsboardService from "./service/thingsboardService";
import log from "./utils/logger";

Vue.use(Vuex)
localStorage.setItem('isAdmin', false);

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    compare_buildings: [], 
    compare_dialog_status: false,
    admin: localStorage.getItem('isAdmin'),
    dashboard_data: [],
    building_data: []
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
      state.compare_buildings.push(id); 
    },
    removeBuildingCompare(state, id) {
      state.compare_buildings = state.compare_buildings.filter(item => item != id); 
    },
    statusCompareDialog(state, payload) {
      state.compare_dialog_status = payload;
    },
    setDashboardData(state, payload) {
      state.dashboard_data = payload;
    },
    setBuildingData(state, payload) {
      state.building_data.push(payload)
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
      return state.dashboard_data;
    },
    getBuildingData(state) {
      return state.building_data;
    },
  },
  actions: {
    async LOAD_DATA(context, payload) {
      try {
        const assets = await ThingsboardService.getAssetsMetaData(payload)
        assets.data.map(item => {
                ThingsboardService.getAssetData(item.id.id).then((data) => {
                if(item.type === "DASHBOARD") {
                  context.commit("setDashboardData", data)
                } else {
                  ThingsboardService.getAssetDevices(item.id.id).then(devices => {
                    let devices_data = []
                    devices.map(device => {
                      devices_data.push({
                        'name': device.toName,
                        'id': device.to.id,
                        'consumption': device.additionalInfo.consumption,
                        'years': device.additionalInfo.years,
                        'type': device.additionalInfo.type,
                        'unit': device.additionalInfo.unit
                      })
                    })
                    context.commit("setBuildingData", {
                      "name": item.name,
                      "id": item.id.id,
                      "category": data.filter(item=> item.key==="category")[0].value,
                      "environment":data.filter(item=> item.key==="environment")[0].value,
                      "image": data.filter(item=> item.key==="image")[0].value,
                      "hours": JSON.parse(data.filter(item=> item.key==="hours")[0].value),
                      "latitude": data.filter(item=> item.key==="latitude")[0].value,
                      "longitude":data.filter(item=> item.key==="longitude")[0].value,
                      "floor_area": JSON.parse(data.filter(item=> item.key==="floor_area")[0].value),
                      "devices": devices_data,
                      "address": data.filter(item=> item.key==="address")[0].value,
                      "assessor": data.filter(item=> item.key==="assessor")[0].value,
                      "band": data.filter(item=> item.key==="band")[0].value,
                      "rating": JSON.parse(data.filter(item=> item.key==="rating")[0].value),
                      "issue": data.filter(item=> item.key==="date_of_issue")[0].value,
                      "expiry": data.filter(item=> item.key==="valid_until")[0].value,
                      "ber": data.filter(item=> item.key==="ber")[0].value,
                      "fuel":data.filter(item=> item.key==="main_fuel")[0].value,
                      "certificate_keys": data.filter(item=> item.key==="certificate_keys")[0].value.split(','),
                    })
                  })
                }
            })
        })
                                                                                                                                                                                                                                                                v 
      } catch(e) {
          log.log('error', 'Cannot fetch data from assets' +e)
          return e
      }
    }
  },
})
