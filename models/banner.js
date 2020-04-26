/**
 * @Description:  banner
 * @author Howard zheng
 * @date
*/

import {Http} from "../utils/Http";

class Banner{

    static locationB='b-1'
    static locationG='b-2'
    static async getLocationB() {
        return await Http.request({
            url: `banner/name/${Banner.locationB}`
        })
    }

    static async getLocationG() {
        return await Http.request({
            url: `banner/name/${Banner.locationG}`
        })
    }
}
export {
    Banner
}