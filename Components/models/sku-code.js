/**
 * @Description: 用于组合sKuCode 这个类的设计他只负责产生自己的当前skuCode产生的路径,然后在另外的地方把这四个
 * 合在一起，
 * @author Howard zheng
 * @date 2020-03-30
*/
import {combination} from "../../utils/util";

class SkuCode{
    code
    spuId
    //这个totalsegments只是用来保存一个sku可能的路径的
    totalsegments=[]
    constructor(code) {
        this.code = code
        //根据后台返回的每一个sku的数据 拆出来所有可能的组合
        this._splitToSegments()
    }
//三个规格中 任意的取一个 任意的取两个
// 任意的取三个 7种组合(三个中取一个 3种 三个中取两个 3种 三个中取三个 1种)
// 4个SKU 28种组合
//28种组合放到字典里面去 就完成了字典的构造
    _splitToSegments(){
        //2$1-45#3-9#4-14 每一组skuCode
        const spuAndSpec = this.code.split('$')
        // spuId SPU的ID
        this.spuId = spuAndSpec[0]
        const specCodeArray = spuAndSpec[1].split('#')
        //算法是建立在组合的基础上面
        const length =  specCodeArray.length
        for(let i=1;i<=length;i++){
            // combination 将每一种可能的组合都列出来 遍历数组 3选1  3选2 3选3
            // segments 返回
            const segments = combination(specCodeArray,i)
//map与foreach的不同在于,Map是可以返回新改变过的数组
//2$1-45#3-9#4-14
//console.log("第"+i+"次循环segments的值"+segments)
            const newSegments = segments.map(segs=>{
                return segs.join('#')
            })
            this.totalsegments = this.totalsegments.concat(newSegments)
//console.log("第"+i+"次循环totalsegments的值"+this.totalsegments)
        }
    }
}
/**
 *
 *
 * **/
export {
    SkuCode
}