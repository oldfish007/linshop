/**
 * @Description: 分页对象
 * @author Howard zheng
 * @date
*/

import {Http} from "../utils/Http";

class Paging{
    //不关心细节
    //哦，我需要下一页的数据了，你能给我吗？
    start
    count
    req
    locker = false
    url
    moreData = true
    accumulator=[]
    //这里的URL是不够的 前端还需要传递data method等数据，所以得传递对象
    constructor(req,count=10,start=0) {
        this.start = start
        this.count = count
        this.req = req
        this.url= req.url
    }
    async getMoreData() {
        //getLocker 首先判断有无锁 有锁说明别的请求正在使用
        //request
        //releaseLock
        //注意如果没有更多数据了 后面的请求就不用在发送了
        if(!this.moreData){
            return
        }
        //如果这里不能获取到锁(this.locker=true)

        if (!this._getLocker()) {
            return
        }
        //发送请求
        const data = await this._actualGetData()
        this._releaseLock()
        return data
    }
    async _actualGetData(){
        const req = this._getCurrnentReq()
        //定义一个临时的变量
        let paging = await Http.request(req)
        if(!paging){
            return null
        }
        //返回来的数据不能直接丢给前端，应该组织一个数据结构
        //如果return的数据比较多的时候就要考虑组织一个数据结构
        if(paging.total==0){
            return{
                empty:true,
                items:[],
                moreData:false,
                accumulator:[]
            }
        }
        //后面都要依赖这个moreData来做判断，因此就不易使用let临时变量了
        this.moreData = Paging._moreData(paging.total_page,paging.page)
        if(this.moreData){
            this.start+=this.count
        }
        this._accumulate(paging.items)
        return {
            empty:false,
            items:paging.items,
            moreData: this.moreData,
            accumulator: this.accumulator
        }
    }
    _accumulate(items){
        this.accumulator =  this.accumulator.concat(items)
    }
    static _moreData(totalPage,pageNum){
        return pageNum<totalPage-1
    }
    _getCurrnentReq(){
        //url每次都要那最新的
        let url = this.url
        //模板变量
        const params = `start=${this.start}&count=${this.count}`
        //url = v1/spu/latest+'?'+param
        //url = v1/spu/latest?other=abc+'&'+params
        if(url.indexOf('?')!==-1){
            url+='&'+params
        }else{
            url+='?'+params
        }
        this.req.url=url
        return this.req
    }
    _getLocker(){
       if(this.locker){//为true代表锁是锁住的
           return false //代表锁是获取不到的 直接 返回false
       }
       //没锁住就先锁住 拿到锁
       this.locker = true
       return true //代表所已经拿到了
    }
    //释放锁
    _releaseLock(){
        this.locker = false
    }
}
export {
    Paging
}