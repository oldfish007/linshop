/**
  * @Description: 利用OO的思想 将每个fence里面在抽象一个对象cell
  * @author Howard zheng
  * @date
 */
import {CellStatus} from "../../core/enum";

class Cell{
     title
     id
     status = CellStatus.WAITING
     spec
     constructor(spec) {
       this.title =spec.value
       this.id = spec.value_id
       this.spec = spec
     }
     //这个方法已经迁移至judger
     getCellCode(){
        return this.spec.key_id+'-'+ this.spec.value_id
     }
 }
 export {
     Cell
 }