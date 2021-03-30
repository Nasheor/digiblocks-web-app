import routes from './routes.json';
import http from './http';

export default class IOTAservice {

    static async getMessages() {
        let ro = routes.read_message.name.replace()
        try {
            const res = await http.post(ro)
            return await Promise.resolve(res.data)
        }
        catch(err) {
            return await Promise.reject(err)
        }
    }

    static async sendDEC() {
        let ro = routes.dec_request.name.replace()
        try {
            const res = await http.post(ro)
            return await Promise.resolve(res.data)
        }
        catch(err) {
            return await Promise.reject(err)
        } 
    }

    static async certifiersRequest() {
        let ro = routes.certificate_route.name.replace()
        try {
            const res = await http.post(ro)
            return await Promise.resolve(res.data)
        }
        catch(err) {
            return await Promise.reject(err)
        }
    }    
}