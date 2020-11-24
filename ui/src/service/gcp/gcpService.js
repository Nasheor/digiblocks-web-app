import routes from './routes.json';
import http from './http';

export default class ThingsboardService {

    static async createDec(body) {
        let ro = routes.create_dec.name
        try {
            const res = await http.post(ro, body)
            return await Promise.resolve(res.data)
        }
        catch (err) {
            return await Promise.reject(err)
        }           
    } 
    
    static async updateDec(body) {
        let ro = routes.update_dec.name
        try {
            const res = await http.post(ro, body)
            return await Promise.resolve(res.data)
        }
        catch (err) {
            return await Promise.reject(err)
        }           
    }

    static async createAsset(body) {
        let ro = routes.create_asset.name
        console.log(ro)
        try {
            const res = await http.post(ro, body)
            return await Promise.resolve(res.data)
        } catch(err) {
            return await Promise.reject(err)
        }
    }

    static async getAsset(payload) {
        let ro= routes.get_asset.name.replace("%args%", payload)
        try {
            const res = await http.get(ro)
        } catch(err) {
            return await Promise.reject(err)
        }
    }

    static async getDec(payload) {
        let ro= routes.get_dec.name.replace("%args%", payload)
        try {
            const res = await http.get(ro)
        } catch(err) {
            return await Promise.reject(err)
        }
    }

    static async traceDec(payload) {
        let ro= routes.trace_dec.name.replace("%args%", payload)
        try {
            const res = await http.post(ro, body)
        } catch(err) {
            return await Promise.reject(err)
        }
    }

    static async updateAssetStatus(payload) {
        let ro = routes.update_asset_status
        try {
            const res = await http.post(payload)
        } catch(err) {
            return await Promise.reject(err)
        }
    }
}