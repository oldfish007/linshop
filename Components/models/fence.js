/**
 * @Description:
    Cell {title: "金属灰"}
    Cell {title: "青芒色"}
    Cell {title: "青芒色"}
    Cell {title: "橘黄色"}
 * @author Howard zheng
 * @date
 *
*/
import {Cell} from "./Cell";

class Fence{
    cells=[]
//fence里面接收规格名一致的规格值,
    newspec
//传进来的仍然是规格名一致的规格值
//[]仍然是一个行列转换过后的一维数组
    title
//规格名的id
    id
    //r是一个一维数组
    constructor(r) {
        this.newspec = r
        this.title = r[0].key //{key_id: 4, key: "尺码", value_id: 14, value: "小号 S"},
        this.id = r[0].key_id
    }
    _init(){
      this._initCells()
    }

    /**
     *  spec
     *
     {key_id: 1, key: "颜色", value_id: 45, value: "金属灰"}
     {key_id: 1, key: "颜色", value_id: 42, value: "青芒色"}
     {key_id: 1, key: "颜色", value_id: 42, value: "青芒色"}
     {key_id: 1, key: "颜色", value_id: 44, value: "橘黄色"}
     * @private
     */
    _initCells(){
        this.newspec.forEach(s=>{
           //循环遍历cells[]数组判断里面如果有value_id一样的就要在push
            const existed = this.cells.some(c=>{
                return c.id === s.value_id
            })
            if(existed){
                return
            }
            const cell = new Cell(s)
            this.cells.push(cell)
        })
    }
}
export {
    Fence
}
