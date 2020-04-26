import {config} from "../config/config";
import {promisic} from "./util";

/**
 * @Description: 将小程序内置非promise API转换为promise
 * 所谓promise就是一个对象用来传递异步操作的消息。他代表了某个未来才会知道结果
 * 的事件，并且这个事件提供统一的API，可供进一步处理
 * 特点
 * 1.pending(进行中) Resolved(已完成) Rejected(已失败)
 * 只有异步操作的结果可以决定当前是哪一种状态，任何其他操作都无法改变这个状态
 * 有了promise对象就可以将异步操作以同步操作的流程表达出来了,避免层层嵌套的回调函数
 * 此外promiese对象提供统一的接口，使得控制异步操作更加容易
 * @author Howard zheng
 * @date
*/
class Http{
    static async request({
                             url,
                             data,
                             method='GET'
                         }) {
//如此改造就把一个不支持promise的api变成一个支持promise的api
        const res = await promisic(wx.request)({
            url:`${config.apiBaseUrl}${url}`,
            data,
            method,
            header:{
                appkey:config.appkey
            }
        })
        return res.data
    }
}
export {
    Http
}