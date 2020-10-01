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
    dashboard_data: [],
    building_data: [],
    gas_value: '',
    co_value: '',
    water_value: '',
    electricity_value: '',
    login_status: localStorage.getItem("login"),
    customer_id: '',
    username: '',
    address: '',
    country: ''
  },
  mutations: {
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
    },
    setLoginStatus(state, payload) {
      state.login_status = payload;
    },
    setCustomerID(state, payload) {
      state.customer_id = payload;
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
    getDashboardData(state) {
      return state.dashboard_data;
    },
    getBuildingData(state) {
      return state.building_data;
    },
    getGasValue(state) {
      return state.gas_value;
    },
    getElectricityValue(state) {
      return state.electricity_value;
    },
    getWaterValue(state) {
      return state.water_value;
    },
    getCoValue(state) {
      return state.co_value;
    },
    getLoginStatus(state) {
      return state.login_status;
    },
    getCustomerID(state) {
      return state.customer_id;
    }
  },
  actions: {
    async LOAD_CUSTOMER_DETAILS(context, payload) {
      const customers = await ThingsboardService.getCustomers()
      let customer_id = ''
      customers.data.map(customer => {
        console.log(customer)
        if (customer.email === payload.email) {
          customer_id = customer.id.id
          context.state.username = customer.title
          localStorage.setItem("title", customer.title)
          context.state.address = customer.zip
          localStorage.setItem("address", customer.zip)
          context.state.country = customer.country
          localStorage.setItem("country", customer.country)
        }
      })

      const customer_details = await ThingsboardService.getCustomerDetails(customer_id)
      customer_details.map(item => {
        if(item.key==="token")
          if(item.value == payload.password) {
            context.commit("setLoginStatus", true)
            context.commit("setCustomerID", customer_id)
            localStorage.setItem("login", true)
            context.dispatch("LOAD_DATA", 999)
          } else {
            localStorage.setItem("login", false)
            console.log("Passwords Don't match")
          }
      })
    },
    async LOAD_DATA(context, payload) {
      try {
        const assets = await ThingsboardService.getAssetsMetaData(context.state.customer_id, payload)
        if(context.state.building_data.length < assets.data.length)
          assets.data.map(item => {
                  ThingsboardService.getAssetData(item.id.id).then((data) => {
                  if(item.type === "DASHBOARD") {
                    ThingsboardService.getAssetDevices(item.id.id).then(devices => {
                      devices.map(device => {
                        ThingsboardService.getSensorData(device.to.id).then(sensor => {
                          switch(device.toName) {
                            case 'Gas':
                              context.state.gas_value = [sensor[2].value, sensor[5].value,  sensor[1].value, sensor[3].value ]
                            break
                            
                            case 'Electricity':
                              context.state.electricity_value = [sensor[2].value, sensor[5].value,  sensor[1].value, sensor[3].value ]
                            break

                            case 'Water':
                              context.state.water_value = [sensor[2].value, sensor[5].value,  sensor[1].value, sensor[3].value ]
                            break

                            case 'Carbon Dioxide':
                              context.state.co_value = [sensor[2].value, sensor[5].value,  sensor[1].value, sensor[3].value ]
                            break
                            
                          }
                        })
                      })
                    })
                    context.commit("setDashboardData", data)
                  } else {
                    ThingsboardService.getAssetDevices(item.id.id).then(devices => {
                      let devices_data = []
                      devices.map(device => {
                        if(device.additionalInfo != null)
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
                        "hours": JSON.parse(data.filter(item=> item.key==="hours_of_occupancy")[0].value),
                        "coordinates": [parseFloat(data.filter(item=> item.key==="latitude")[0].value), parseFloat(data.filter(item=> item.key==="longitude")[0].value)],
                        "floor_area": JSON.parse(data.filter(item=> item.key==="total_useful_floor_area")[0].value),
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
                        "activity": JSON.parse(data.filter(item=> item.key==="activity")[0].value),
                        "devices": data.filter(item=> item.key==="devices")[0].value,
                        "color": data.filter(item => item.key==="color")[0].value
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
