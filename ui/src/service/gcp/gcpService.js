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
            console.log(res)
            return await Promise.resolve(res.data)
        } catch(err) {
            return await Promise.reject(err)
        }
    }
}