import log from "../../utils/logger";
import ThingsboardService from "../../service/thingsboardService";

export default class ThingsBoardController {

    static async getAssets(limit) {
        try {
            const assets = await ThingsboardService.getAssets(limit)
            let filteredData = []
            assets.data.map(item => {
                filteredData.push({
                    "id": item.id.id,
                    "type": item.type
                })
            })
            return filteredData
                                                                                                                                                                                                                                                                    v 
        } catch(e) {
            log.log('error', 'Cannot fetch data from assets' +e)
            return e
        }
    }

    static async getDashboardData(id) {
        try {
            const data = await ThingsboardService.getDashboardData(id)
            console.log(data)
            return data
        }catch(e) {
            log.log('error', 'Cannot fetch data from asset' +e)
            return e
        }
    }
}