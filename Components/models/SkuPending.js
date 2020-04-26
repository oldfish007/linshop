/**
 * @Description: 这个类用于记录用户的输入
 * @author Howard zheng
 * @date 2020-04-01
*/
class SkuPending {
    //记录用户选中的cell
    pending = []

    constructor() {

    }
    //向skupending里面
//插入cell 这里在插入的时候是要考虑顺序的
//如果用户选择了第一行的cell,x就是0
    insertCell(cell, x) {
        this.pending[x] = cell
    }
//用户的反选
    removeCell(x) {
        this.pending[x] = null
    }

    findSelectedCellByX(x) {
        return this.pending[x]
    }
//和x对应的数组下面有没有对应的元素
 //一个x行里面有三个cell 不一定传进来的就是pendingCell 还需要判断一下
    isSelected(cell,x){
        //先判断一个pending[]数组里面当前行存不存在规格值
        const pendingCell = this.pending[x]
        //如果当前行不存在就直接 返回false
        if(!pendingCell){
            return false
        }
        //pending数组里面存储的是每一行的cell，所以传进来的cell不一定就是当前行的cell
        return cell.id === pendingCell.id
    }
}
export {
    SkuPending
}
