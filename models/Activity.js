/**
 * @Description: 优惠券是以活动的形式发放的
 * @author Howard zheng
 * @date
*/
import {Http} from "../utils/Http";

class Activity{
    static locationD='a-2'
    static async getLocationD(){
        return await Http.request({
            url:`activity/name/${Activity.locationD}`
        })
    }
}
export {
    Activity
}