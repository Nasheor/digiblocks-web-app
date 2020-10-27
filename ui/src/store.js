import Vue from 'vue'
import Vuex from 'vuex'
import ThingsboardService from "./service/thingsboard/thingsboardService"
import gcpService from './service/gcp/gcpService'
import log from "./utils/logger"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null, 
    compare_buildings: [], 
    compare_dialog_status: false,
    dashboard_data: [],
    building_data: [],
    devices_data: [],
    gas_value: '',
    co_value: '',
    water_value: '',
    electricity_value: '',
    login_status: localStorage.getItem("login"),
    customer_id: '',
    username: '',
    address: '',
    country: '',
    role: '',
  },
  mutations: {
    clearData(state) {
      state.dashboard_data = [];
      state.building_data = [];
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
    clearBuildingCompare(state) {
      state.compare_buildings = [];
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
      let flag = false
      if(state.building_data.length > 0) {
        state.building_data.map(building => {
          if(building.name === payload.name) {
            flag = true 
          }
        })
      }
      if(flag === false)
        state.building_data.push(payload)
    },
    setDevicesData(state, payload) {
      let flag = false
      if(state.devices_data.length > 0) {
        state.devices_data.map(device => {
          if(device.id === payload.id) {
            flag = true 
          }
        })
      }
      if(flag === false)
        state.devices_data.push(payload)
    },
    setLoginStatus(state, payload) {
      state.login_status = payload;
    },
    setCustomerID(state, payload) {
      state.customer_id = payload;
    },
    setRole(state, payload) {
      state.role = payload;
    }
   },
  getters: {
    getCompareBuildings(state) {
      return state.compare_buildings; 
    },
    getCompareDialogStatus(state) {
      return state.compare_dialog_status;
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
    },
    getRole(state) {
      return state.role;
    }
  },
  actions: {
    async LOAD_CUSTOMER_DETAILS(context, payload) {
      const customers = await ThingsboardService.getCustomers()
      console.log(customers)
      let customer_id = ''
      customers.data.map(customer => {
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
      let password = ""
      let role = ""
      customer_details.map(item => {
        if(item.key==="token")
          password = item.value
        if(item.key==="role")
          role=item.value
      })
      if(password === payload.password && role === payload.role) {
        context.commit("setLoginStatus", true)
        context.commit("setCustomerID", customer_id)
        context.commit("setRole", role)
        localStorage.setItem("login", true)
        context.dispatch("LOAD_DATA", 999)        
      } else {
        localStorage.setItem("login", false)
        console.log("Credentials Don't match with existing records")        
      }
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
                      devices.map(device => {
                        let tmp_holder = device.toName.split(" ")
                        if(tmp_holder[2] === "Sensor") {
                          ThingsboardService.getSensorData(device.to.id).then(sensor => {
                            context.commit("setDevicesData", {
                              'name': tmp_holder[0],
                              'id': device.to.id,
                              'unit': sensor[2].value,
                              'type': tmp_holder[1]         
                            })
                          })
                        }
                      })
                      // context.dispatch("UPDATE_TELEMETRY")
                      context.commit("setBuildingData", {
                        "name": item.name,
                        "id": item.id.id,
                        "category": data.filter(item=> item.key==="category")[0].value,
                        "environment":data.filter(item=> item.key==="environment")[0].value,
                        "image": data.filter(item=> item.key==="image")[0].value,
                        "hours": JSON.parse(data.filter(item=> item.key==="hours_of_occupancy")[0].value),
                        "coordinates": [data.filter(item=> item.key==="latitude")[0].value *1, data.filter(item=> item.key==="longitude")[0].value * 1],
                        "floor_area": JSON.parse(data.filter(item=> item.key==="total_useful_floor_area")[0].value),
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
    },
    async UPDATE_TELEMETRY(context) {
      let nimbus_e_2016_body = '{"ts":1483228740000, "values": {"sensorvalue": 185250}}'
      let nimbus_gas_2016_body = '{"ts":1483228740000, "values": {"sensorvalue": 262050}}'
      let co_body = '{"ts":1483228740000, "values": {"sensorvalue": 185240}}'
      let water_body = '{"ts":1483228740000, "values": {"sensorvalue": 262040}}'     
      let device = context.state.devices_data
      for(let i = 0; i < device.length; i++){
        try {
          if(device.name = "Nimbus") {
            const update_gas = await ThingsboardService.postDatatoSensor(nimbus_gas_2016_body, device[i].id)
            const update_electricity = await ThingsboardService.postDatatoSensor(nimbus_e_2016_body, device[i].id)
          } else {
            const update_gas = await ThingsboardService.postDatatoSensor(nimbus_gas_2016_body, device[i].id)
            const update_electricity = await ThingsboardService.postDatatoSensor(nimbus_e_2016_body, device[i].id)
            const update_co = await ThingsboardService.postDatatoSensor(co_body, device[i].id)
            const update_water = await ThingsboardService.postDatatoSensor(water_body, device[i].id)  
          }
        } catch (e) {
          log.log('error', 'Cannot update data from sensors' +e)
          return e          
        }

      }
    },
    async LOAD_REGISTERED_ASSETS(context) {

    },
    async REGISTER_ASSET(context, payload) {
      try{
        const assets = await gcpService.createAsset(payload)
      } catch(e) {
        log.log('error', 'Cannot '+e)
      }

    }
  },
})
