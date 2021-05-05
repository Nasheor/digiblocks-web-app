import routes from './routes.json';
import http from './http';

export default class IOTAservice {

    static async readMessages() {
        let ro = routes.read_message.name.replace()
        try {
            const res = await http.post(ro)
            return await Promise.resolve(res.data)
        }
        catch(err) {
            return await Promise.reject(err)
        }
    }

    static async sendDec() {
        let ro = routes.dec_request.name.replace()
        try {
            const res = await http.post(ro)
            return await Promise.resolve(res.data)
        }
        catch(err) {
            return await Promise.reject(err)
        } 
    }

    static async getCertifiers() {
        let ro = routes.get_certifiers.name.replace()
        try {
            const res = await http.post(ro)
            return await Promise.resolve(res.data)
        }
        catch(err) {
            return await Promise.reject(err)
        }
    }
    
    static async certify() {
        let ro = routes.certify.name.replace()
        try {
            const res = await http.post(ro)
            return await Promise.resolve(res.data)
        }
        catch(err) {
            return await Promise.reject(err)
        }
    }
}