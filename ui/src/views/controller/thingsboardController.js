import log from "../../utils/logger";
import ThingsboardService from "../../service/thingsboardService";

export default class ThingsBoardController {

    static async getTenantAssets(limit) {
        try {
            const assets = await ThingsboardService.getAssets(limit);
            return assets;
                                                                                                                                                                                                                                                                    v 
        } catch(e) {
            log.log('error', 'Cannot fetch data from assets' +e);
            return e;
        }
    }

    static async getTenantDashboards(limit) {
        try {
            const dashboard = await ThingsboardService.getDashboards(limit);
            return dashboard;
                                                                                                                                                                                                                                                                    v 
        } catch(e) {
            log.log('error', 'Cannot fetch data from assets' +e);
            return e;
        }
    }
}