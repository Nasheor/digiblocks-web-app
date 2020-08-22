import routes from './routes.json';
import http from './http';

export default class ThingsboardService {

    static async getAssets(limit) {
        let ro = routes.base_asset_route.name.replace("%limit%", limit)
        try {
            const res = await http.get(ro)
            return await Promise.resolve(res.data)
        }
        catch (err) {
            return await Promise.reject(err)
        }        
    }

    static async getDashboardData(id) {
        let ro = routes.asset_by_id_route.name.replace("%id%", id)
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