import routes from './routes.json';
import http from './http';

export default class ThingsboardService {
    
    static async getCustomers() {
        let ro = routes.customer_route.name.replace()
        try {
            const res = await http.get(ro)
            return await Promise.resolve(res.data)
        }
        catch (err) {
            return await Promise.reject(err)
        }           
    }

    static async getCustomerDetails(id) {
        let ro = routes.customer_details_route.name.replace("%id%", id)
        try {
            const res = await http.get(ro)
            return await Promise.resolve(res.data)
        }
        catch (err) {
            return await Promise.reject(err)
        }  
    }

    static async getAssetsMetaData(customer_id, limit) {
        let r = routes.base_asset_route.name.replace("%limit%", limit)
        let ro = r.replace("%customer_id%", customer_id)
        try {
            const res = await http.get(ro)
            return await Promise.resolve(res.data)
        }
        catch (err) {
            return await Promise.reject(err)
        }        
    }

    static async getAssetData(id) {
        let ro = routes.asset_by_id_route.name.replace("%id%", id)
        try {
            const res = await http.get(ro)
            return await Promise.resolve(res.data)
        }
        catch (err) {
            return await Promise.reject(err)
        }  
    }

    static async getAssetDevices(id) {
        let ro = routes.devices_by_asset_id.name.replace("%id%", id)
        try {
            const res = await http.get(ro)
            return await Promise.resolve(res.data)
        }
        catch (err) {
            return await Promise.reject(err)
        }
    }

    static async getSensorData(device_id) {
        let tmp_ro = routes.sensor_values.name.replace("%id%", device_id)
        try {
            let r = await http.get(tmp_ro)
            return await Promise.resolve(r.data)
        } catch (err) {
            return await Promise.reject(err)
        }
    }
    static async getTelemetryData(id) {
        let tmp_ro = routes.get_telemetry.name.replace("%id%", id)
        try {
            let r = await http.get(tmp_ro)
            return await Promise.resolve(r.data)
        } catch (err) {
            return await Promise.reject(err)
        }
    }

    static async postDatatoSensor(body, id) {
        body = JSON.parse(body)
        let tmp_ro = routes.update_telemetry.name.replace("%id%", id)
        try {
            let r = await http.post(tmp_ro, body)
            return await Promise.resolve(r.data)
        } catch (err) {
            return await Promise.reject(err)
        }        
    }

    static async deleteTelemetryData() {
        let tmp_ro = routes.delete_telemetry.name
        try {
            let r = await http.delete(tmp_ro)
            return await Promise.resolve(r.data)
        } catch (err) {
            return await Promise.reject(err)
        }          
    }

    static async updateAssetAttribute(body, id) {
        let tmp_ro = routes.update_asset_attribute.name.replace("%id%", id)
        try {
            let r = await http.post(tmp_ro, body)
            return await Promise.resolve(r.data)
        } catch (err) {
            return await Promise.reject(err)
        }       
    }

    static async updateDeviceAttribute(body, id) {
        let tmp_ro = routes.update_dec_device_attribute.name.replace("%id%", id)
        try {
            let r = await http.post(tmp_ro, body)
            return await Promise.resolve(r.data)
        } catch (err) {
            return await Promise.reject(err)
        }       
    }

    static async getAssetType(id) {
        let r = routes.get_asset_types.name.replace("%id%", id)
        try {
            const res = await http.get(r)
            return await Promise.resolve(res.data)
        }
        catch (err) {
            return await Promise.reject(err)
        } 
    }

    static async getAllDevices() {
        let r = routes.get_device_metadata.name
        try{
            let result = await http.get(r)
            return await Promise.resolve(result.data)
        }
        catch(err) {
            return await Promise.reject(err)
        }
    }

    static async getDeviceData(id) {
        let r = routes.get_tenant_devices.name.replace("%id%", id)
        try {
            let result = await http.get(r)
            return await Promise.resolve(result.data)
        }
        catch(err) {
            return Promise.reject(err)
        }
    }
}