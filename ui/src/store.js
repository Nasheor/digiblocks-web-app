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
    email: '',
    certificates: [],
    dec_ids: [],
  },
  mutations: {
    clearData(state) {
      state.dashboard_data = [];
      state.building_data = [];
      state.devices_data = [];
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
    },
    setCertificates(state, payload) {
      let flag = true
      state.certificates.map(certificate => {
        if(certificate.asset_id === payload.id) {
          flag = false
        }
      })
      if(flag == true)
      state.certificates.push(certificate)
    },
    setEmail(state, payload) {
      state.email = payload
    },
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
    },
    getDevicesData(state) {
      return state.devices_data
    },
    getCertificateData(state) {
      return state.certificates;
    },
    getEmail(state) {
      return state.email;
    },
  },
  actions: {
    async LOAD_CUSTOMER_DETAILS(context, payload) {
      const customers = await ThingsboardService.getCustomers()
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
          role = item.value
      })
      if(password === payload.password && role === payload.role) {
        context.commit("setLoginStatus", true)
        context.commit("setCustomerID", customer_id)
        if(payload.flag === true)
          context.commit("setRole", "External Verifier")
        else
          context.commit("setRole", role)
        localStorage.setItem("login", true)
        context.dispatch("LOAD_DATA", 999)        
      } else {
        localStorage.setItem("login", false)
        console.log("Credentials Don't match with existing records")        
      }
    },

    async LOAD_DATA(context, payload) {
      let dec_data = {}   
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
                        let tmp_holder = device.toName.split('.')
                        dec_data = {
                          'asset_id': '',
                          'device_id': '',
                          'annual_electrical': 0,
                          'annual_non_electrical': 0,
                          'assessor': "Not Verified",
                          'band': 'B1',
                          'ber': 0,
                          'building_electrical': 0,
                          'building_non_electrical': 0,
                          'certificate_verified': 0,
                          'co2_performance': 0,
                          'dlt_cert_status': '',
                          'dlt_status': '',
                          'total_energy_use_per_area': 0,
                          'date_of_issue': '',
                          'valid_until': '',
                          'certificate_generated': ''
                        }
                           
                        ThingsboardService.getSensorData(device.to.id).then(sensor => {
                          if(tmp_holder[2] === "DEC") {                            
                            let tmp_verifier = item.name.substr(0,3).toUpperCase()
                            if(tmp_verifier === tmp_holder[1]) {
                              dec_data.device_id = device.to.id
                              dec_data.asset_id = device.to.id
                            }
                            if(sensor.length > 2) {
                              sensor.map(attr => {
                                if(attr.key === "annual_non_electrical")
                                  dec_data.annual_non_electrical = attr.value
                                else if(attr.key === "building_electrical") 
                                  dec_data.building_electrical = attr.value
                                else if(attr.key === "building_non_electrical") 
                                  dec_data.building_non_electrical = attr.value
                                else if(attr.key === "annual_electrical") 
                                  dec_data.annual_electrical = attr.value 
                                else if(attr.key === "assessor") 
                                  dec_data.assessor = attr.value    
                                else if(attr.key === "band") 
                                  dec_data.band = attr.value 
                                else if(attr.key === "ber") 
                                  dec_data.ber = attr.value
                                else if(attr.key === "certificate_verified") 
                                  dec_data.certificate_verified = attr.value
                                else if(attr.key === "co2_performance") 
                                  dec_data.co2_performance = attr.value    
                                else if(attr.key === "dlt_cert_status") 
                                  dec_data.dlt_cert_status = attr.value  
                                else if(attr.key === "dlt_status") 
                                  dec_data.dlt_status = attr.value    
                                else if(attr.key === "total_energy_use_per_area") 
                                  dec_data.total_energy_use_per_area = attr.value
                                else if(attr.key === "date_of_issue") 
                                  dec_data.date_of_issue = attr.value   
                                else if(attr.key === "valid_until") 
                                  dec_data.valid_until = attr.value 
                                else if(attr.key === "certificate_generated") 
                                  dec_data.certificate_generated = attr.value                                                                                                                                                                                                                                                                                                                                            
                              })
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
                                "assessor": dec_data.assessor,
                                "band": dec_data.band,
                                "issue": dec_data.date_of_issue,
                                "expiry": dec_data.valid_until,
                                "ber": dec_data.ber,
                                "fuel":data.filter(item=> item.key==="main_fuel")[0].value,
                                "certificate_keys": data.filter(item=> item.key==="certificate_keys")[0].value.split(','),
                                "activity": JSON.parse(data.filter(item=> item.key==="activity")[0].value),
                                "devices": data.filter(item => item.key==="devices")[0].value,
                                "color": data.filter(item => item.key==="color")[0].value,
                                "latitude": data.filter(item => item.key==="latitude")[0].value,
                                "longitude": data.filter(item => item.key==="longitude")[0].value,
                                "dlt_status": dec_data.dlt_status,
                                "dlt_cert_status": dec_data.dlt_cert_status,
                                "dec_category": data.filter(item => item.key === "dec_category")[0].value,
                                "annual_electrical": dec_data.annual_electrical,
                                "annual_non_electrical": dec_data.annual_non_electrical,
                                "building_electrical": dec_data.building_electrical,
                                "building_non_electrical": dec_data.building_non_electrical,
                                "certificate_verified": dec_data.certificate_verified,
                                "co2_performance": dec_data.co2_performance,   
                                "certificate_keys": data.filter(item => item.key === "certificate_keys")[0].value,
                                "dec_id": dec_data.device_id,
                                "certificate_generated": dec_data.certificate_generated
                              })  
                            } 
                          } else {
                            ThingsboardService.getTelemetryData(device.to.id).then(sensor_data => {
                              context.commit("setDevicesData", {
                                'asset_id': item.id.id,
                                'device_id': device.to.id,
                                'unit': sensor[2].value,
                                'type': tmp_holder[3],
                                'ts': sensor_data.sensorvalue[0].ts,
                                'value': sensor_data.sensorvalue[0].value,       
                              })
                             }
                            )                            
                          }                     
                        })
                      })
                      // context.dispatch("UPDATE_TELEMETRY")          
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
      let nimbus_e_2016_body = '{"ts":1546257540000, "values": {"sensorvalue": 185150}}'
      let nimbus_gas_2016_body = '{"ts":1546257540000, "values": {"sensorvalue": 162050}}'
      // let co_body = '{"ts":1546257540000, "values": {"sensorvalue": 185240}}'
      // let water_body = '{"ts":1546257540000, "values": {"sensorvalue": 262040}}'     
      let device = context.state.devices_data
      for(let i = 0; i < device.length; i++){
        console.log(device[i])
        try {
            const update_gas = await ThingsboardService.postDatatoSensor(nimbus_gas_2016_body, device[i].device_id)
            const update_electricity = await ThingsboardService.postDatatoSensor(nimbus_e_2016_body, device[i].device_id)
            // console.log(update_electricity)
            // console.log(update_gas)
          } catch (e) {
          log.log('error', 'Cannot update data from sensors' +e)
          return e          
        }

      }
    },

    async UPDATE_DEC(context, payload) {
      ThingsboardService.updateDeviceAttribute(payload.body, payload.id).then(t=> 
        {context.dispatch("LOAD_DATA", 999)})
    },  

    async UPDATE_ASSET_STATUS(context, payload) {
      ThingsboardService.updateAssetAttribute(payload.body, payload.id)
      context.commit('clearData')
      context.dispatch("LOAD_DATA", 999)
    },

    async REGISTER_ASSET(context, payload) {
      try{
        const assets = await gcpService.createAsset(payload)
        return assets 
      } catch(e) {
        log.log('error', 'Cannot '+e)
      }
    },

    async REGISTER_DEC(context, payload) {
      try{
        const dec = await gcpService.createDec(payload)
        return dec
      } catch(e) {
        log.log('error', 'Cannot '+e)
      }      
    },

    async TRACE_DEC(context, payload) {
      try {
        const dec = await gcpService.traceDec(payload)
        console.log(dec)
        return dec
      } catch(e) {
        log.log('error', 'Cannot '+e)
      }
    }
  },
})
