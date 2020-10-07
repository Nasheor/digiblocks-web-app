import routes from './routes.json';
import http from './http';

export default class ThingsboardService {

    static async createDec(body) {
        let ro = routes.create_dec
        try {
            const res = await http.get(ro, body)
            return await Promise.resolve(res.data)
        }
        catch (err) {
            return await Promise.reject(err)
        }           
    } 
    
    static async updateDec(body) {
        let ro = routes.update_dec
        try {
            const res = await http.get(ro, body)
            return await Promise.resolve(res.data)
        }
        catch (err) {
            return await Promise.reject(err)
        }           
    }
}