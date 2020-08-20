import routes from './routes.json';
import http from './http';

export default class ThingsboardService {

    static getAssets(limit){
        console.log(limit);
        const ro = routes.tenant_assets_route.name
        .replace('%limit%', limit)
        console.log(http)
        return http.get(ro)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));
    }

    static getDashboards(limit) {
        const ro = routes.tenant_dashboard_route.name.replace('%limit%', limit)
        return http.get(ro)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));
    }
}