import routes from './routes.json';
import http from './http';

export default class ThingsboardService {

    static async getAssetsMetaData(limit) {
        let ro = routes.base_asset_route.name.replace("%limit%", limit)
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
        console.log(ro)
        try {
            const res = await http.get(ro)
            return await Promise.resolve(res.data)
        }
        catch (err) {
            return await Promise.reject(err)
        }
    }
}