/**
 * @Description:
 * @author Howard zheng
 * @date
*/
import {Http} from "../utils/Http";

class Spu{

    static async getDetail(id) {
       return await Http.request({
            //模板变量
            url: `spu/id/${id}/detail`
        })
    }
}
export {
    Spu
}