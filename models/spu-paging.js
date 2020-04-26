/**
 * @Description:  用户实例化pageing分页对象的业务类，封装在这个类
 * @author Howard zheng
 * @date
*/

import {Paging} from "./Paging";

class SpuPaging{
    static getlatestPaging(){
        return new Paging({
            url:`spu/latest`
        },5)
    }
}
export {
    SpuPaging
}