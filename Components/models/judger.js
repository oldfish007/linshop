/**
 * @Description:
 * 判断用户选择的路径是否在字典里面,通过fenceGroup拿到所有的SKU，然后在去读取code码
 * 进行分解，最终应该存value_id，未来可能的路径查找是否真的存在就用这个pathDict来查找
 * @author Howard zheng
 * @date 2020-03-30
*/
import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";
import {SkuPending} from "./SkuPending";
import {Joiner} from "../../utils/joiner";

class Judger{

    fenceGroup
    pathDict=[]
    skuPending

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this._initSkuPending()
        this._initPathDict()
    }

    _initSkuPending(){

        this.skuPending = new SkuPending()
    }

    _initPathDict(){
        //有4个sku 遍历 4个中单独
        this.fenceGroup.spu.sku_list.forEach(s=>{
            //分别实例化每一个SKU的code
            const skuCode = new SkuCode(s.code)
            //这样就把sku所有可能的路径都放到了pathDict字典里面了,后面用于查询可能路径的基础字典库
            /*
            第一个SKU
            1-45#3-9#4-14",
            "1-45#3-9#4-14",
            "1-45#3-9#4-14",
            "1-45,3-9#1-45,4-14#3-9,4-14",
            "1-45,3-9#1-45,4-14#3-9,4-14",
            "1-45,3-9#1-45,4-14#3-9,4-14",
            "1-45,3-9,4-14
            第二个SKU
            [
            "1-45#3-9#4-14",
            "1-45#3-9#4-14",
            "1-45#3-9#4-14",
            "1-45,3-9#1-45,4-14#3-9,4-14",
            "1-45,3-9#1-45,4-14#3-9,4-14",
            "1-45,3-9#1-45,4-14#3-9,4-14",
            "1-45,3-9,4-14",
            "1-42#3-10#4-15",
             "1-42#3-10#4-15",
             "1-42#3-10#4-15",
             "1-42,3-10#1-42,4-15#3-10,4-15",
             "1-42,3-10#1-42,4-15#3-10,4-15",
             "1-42,3-10#1-42,4-15#3-10,4-15",
             "1-42,3-10,4-15"]
             */

            this.pathDict =  this.pathDict.concat(skuCode.totalsegments)
console.log(this.pathDict)
        })
//4个sku_list都会放到放入pathDict里面
/*
["1-45#3-9#4-14",
"1-45#3-9#4-14",
"1-45#3-9#4-14",
"1-45,3-9#1-45,4-14#3-9,4-14",
"1-45,3-9#1-45,4-14#3-9,4-14",
"1-45,3-9#1-45,4-14#3-9,4-14",
"1-45,3-9,4-14", 三个里面选三个 只有一种组合
"1-42#3-10#4-15",
"1-42#3-10#4-15",
"1-42#3-10#4-15",
"1-42,3-10#1-42,4-15#3-10,4-15",
"1-42,3-10#1-42,4-15#3-10,4-15",
"1-42,3-10#1-42,4-15#3-10,4-15",
"1-42,3-10,4-15",
"1-42#3-11#4-16",
"1-42#3-11#4-16",
"1-42#3-11#4-16",
"1-42,3-11#1-42,4-16#3-11,4-16",
"1-42,3-11#1-42,4-16#3-11,4-16",
"1-42,3-11#1-42,4-16#3-11,4-16",
"1-42,3-11,4-16",
"1-44#3-9#4-14",
"1-44#3-9#4-14",
"1-44#3-9#4-14",
"1-44,3-9#1-44,4-14#3-9,4-14",
"1-44,3-9#1-44,4-14#3-9,4-14",
"1-44,3-9#1-44,4-14#3-9,4-14",
"1-44,3-9,4-14"]
 */
//console.log(this.pathDict)
 }

    /**
     * 这个方法作为实现SKU路径的核心方法
     * 1.点击以后改变当前呈现的显示状态
     * 2.分别遍历每一行每一个cell
     *         得到与当前元素相关的可能潜在路径_findPotentiaPath(cell,x,y)
     *         判断潜在路径是否为null,为null直接Return
     *  3.判断潜在路径是否都在字典路径里面，如果为true就更新fencegroup.fences.cell的status状态
     *    if(isIn){
     *        this.fenceGroup.fences[x].cell[y].status= CellStatus.WAITING
     *    }else{
     *        this.fenceGroup.fences[x].cell[y].status = CellStatus.FORBIDDEN
     *    }
     * @param cell
     * @param x
     * @param y
     */
    judge(cell,x,y){
//改变状态
        this._changeCurrentCellStatus(cell,x,y)
//传回调函数过去
        this.fenceGroup._eachCell((cell,x,y)=>{
            //传进去一个当前规格对象，计算出所有潜在路径
            const path = this._findPotentiaPath(cell,x,y)
//丢给前端的潜在路径
console.log(path)
            if(!path){
                return
            }
//把潜在路径放到字典里面去查一下
            const isIn = this._isInDict(path)

//存在就可选，不存在就forbidden
            if(isIn){
                this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
            }else{
                this.fenceGroup.fences[x].cells[y].status = CellStatus.FORBIDDEN
            }
        })
    }
// 思路的自然延展 可读性更强
    _isInDict(path){

        return this.pathDict.includes(path)
    }


//循环按照每行遍历的方式找出潜在路径
//传进来一个带坐标的cell有X和Y,但是每次循环是扫描三行
//调用9次 3*3的矩阵
//注意这里的cell是渲染层返回给我们的数据，并不是我们的模型对象
    _findPotentiaPath(cell,x,y){
        //构造函数给一个#,多个字符串之用#来连接
        const joiner = new Joiner('#')
//当前行 + 其他行的已选元素 所以说确定当前行是非常重要的
//尺码由于没有选中是不可能出现的潜在路径里面的
        for(let i=0;i< this.fenceGroup.fences.length;i++){
//当前行中放到SkuPending类中pending[]中状态为selected的cell
//每一行只会选择一个元素，是互斥的所以pending[] 只存放每一行的cell
//我要的是每一行(当前行)的规格值，那个元素是已选的，而不是当前元素，所以要传i
            const selected = this.skuPending.findSelectedCellByX(i)
//如果是当前行,就把当前cell加入进去
//判断当前行就是x === i
            if(x === i){
                //当前行cell的 id 1-42 加入到path里面(我们要得到1-42这种形式可以在cell写个方法)
                //并且当前行当前这个cell为选中的元素
                //解决已选中元素被重置为waiting的逻辑（要做的判断当前行并且是已选元素)
                //if(cell.status === CellStatus.SELECTED){
                if(this.skuPending.isSelected(cell,x)){
                     return
                }
//注意这里的cell是渲染层返回给我们的js对象数据，并不是我们的模型对象
//处理：1,还原成模型对象  const cell = new Cell(cell.spec)
                const cellCode  = this._getCellCode(cell.spec)
                joiner.join(cellCode)
            }else{
 //如果其他行首先得判断有没有已选状态为selected的cell
 //判断放在skuPending  selected 的cell加入到 path
 //3-56
 //首先要找到其他行有没有找到已选元素，如果有已选元素我们肯定要把它加到前台路径里面去
  //如果没有已选元素就什么都不用加，那么就需要一个数据已选元素怎么得到skuPending
                if(selected){
                    const selectedCellCode = this._getCellCode(selected.spec)
                    joiner.join(selectedCellCode)
                }
            }
        }
        return joiner.getStr()
    }
    //1-45
    _getCellCode(spec){
        return spec.key_id+'-'+ spec.value_id
    }
//正选是可选变为选中SELECT，反选是选中变为可选 WAITING
    _changeCurrentCellStatus(cell,x,y){
        if(cell.status === CellStatus.WAITING){
           // cell.status = CellStatus.SELECTED
            this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED
           //此处控制添加 对于某个Cell，不需要考虑当前行其他cell是否已选
            this.skuPending.insertCell(cell,x)
        }
 //如果已经是已选状态就要恢复成WAITING状态
 //用户点击取消就把已选置位待选状态
        if(cell.status === CellStatus.SELECTED){
           //cell.status = CellStatus.WAITING
            this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
            this.skuPending.removeCell(x)
        }
    }
}
export {
    Judger
}