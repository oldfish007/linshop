/**
 * @Description:
 * @author Howard zheng
 * @date
*/
import {Matrix} from "./matrix";
import {Fence} from "./fence";


class FenceGroup{
    spu
    skuList=[]
    fences=[]
    constructor(spu) {
        this.spu = spu
        this.skuList = spu.sku_list
    }
    //获取CMS定义的默认SKU显示
    getDefaultSku(){
        const defaultSkuId = this.spu.default_sku_id
        if(!defaultSkuId){
            return
        }
        return this.spu.sku_list.find(s=>s.id === defaultSkuId)
    }

    initFence1(){
        //只是将sku  push到数组里面去
        const matrix = this._createMatrix(this.skuList)
        //i 和 j代表element(矩阵里面的某一个元素)在矩阵里面的行号和列号
        //每个SKU总共有3个element
        //目标就是要生成三个fence
        //数组里面放了三个fence对象
        const fences = []
        let currnetJ = -1
        matrix.each((element,i,j)=>{
            if(currnetJ!=j){
                currnetJ=j
                //创建 fence
                fences[currnetJ] = this._createFence(element)
            }
            fences[currnetJ].pushValueTitle(element.value)
        })
    }

    initFence(){
        const matrix = this._createMatrix(this.skuList)
        const fences = []
        //
        const AT = matrix.transpose()
/*
矩阵行列转置后的结果
console.log(AT)
[
  [
    {key_id: 1, key: "颜色", value_id: 45, value: "金属灰"},
    {key_id: 1, key: "颜色", value_id: 42, value: "青芒色"},
    {key_id: 1, key: "颜色", value_id: 42, value: "青芒色"},
    {key_id: 1, key: "颜色", value_id: 44, value: "橘黄色"}
  ],
  [
    {key_id: 3, key: "图案", value_id: 9,value: "七龙珠"},
    {key_id: 3, key: "图案", value_id: 10,value: "灌篮高手"},
    {key_id: 3, key: "图案", value_id: 11,value: "圣斗士"},
    {key_id: 3, key: "图案", value_id: 9,value: "七龙珠"}
  ],
  [
    {key_id: 4, key: "尺码", value_id: 14, value: "小号 S"},
    {key_id: 4, key: "尺码", value_id: 15, value: "中号 M"},
    {key_id: 4, key: "尺码", value_id: 16, value: "大号  L"},
    {key_id: 4, key: "尺码", value_id: 14, value: "小号 S"}
  ]
]
(3) 
 */
//完成转置后的数组，遍历实例化fence
        AT.forEach(r=>{
            const fence = new Fence(r)
            fence._init()
            fences.push(fence)
        })
        this.fences=fences
console.log(fences)
    }

    setCellStatusByXY(x,y,status){
        this.fences[x].cells[y].status = status
    }

    setCellStatusById(cellId,status){
        this._eachCell((cell)=>{
            if(cell.id===cellId){
                cell.status=status
            }
        })
    }

    _eachCell(cb){
        for(let i=0;i<this.fences.length;i++){
            for(let j=0;j<this.fences[i].cells.length;j++){
                const cell = this.fences[i].cells[j]
                cb(cell,i,j)
            }
        }
    }

    //可以把这个方法当成生成fence的工厂,只负责实例化fence
    _createFence(element){
        const fence = new Fence()
        //fence.pushValueTitle(element.value)
        return fence
    }
//构建一个矩阵
    /**
     *
      * @param skuList.specs
     * 金属灰   七龙珠   小号S
     * 青芒色    灌篮高手  中号M
     * 青芒色    圣斗士   大号M
     * 橘黄色   七龙珠   小号S
     * @returns {Matrix}
     * @private
     */
    _createMatrix(skuList){
        const m = []
        skuList.forEach(sku=>{
            m.push(sku.specs)
        })
        return new Matrix(m)
    }
    // 1.找一个数学函数库 (JS数学函数库太少了) 2.不用数学函数库还是借助矩阵思维
    // 小程序如果不用分包仅有有2M的限制
}
export {
    FenceGroup
}
