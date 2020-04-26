// Components/realm/index.js
import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
      spu:Object
  },
  /**
   * 组件的初始数据
   */
  data: {
    judger:Object
  },
  /**
   * observers 	Object 	否  数据监听器
   * 组件数据字段监听器，用于监听 properties 和 data 的变化，参见 数据监听器
   */
  observers:{
    'spu':function (spu) {
      if(!spu){
        return
      }
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFence()
      //Judger职责 初始化完成pathDict字典库 初始化skupending
      //实例化skuPending 这个对象用于装已选中的cell
      const judger = new Judger(fenceGroup)
      this.data.judger = judger
      this.bindInitData(fenceGroup)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindInitData(fenceGroup){
      //初始化的时候刷新了状态
      this.setData({
        fences:fenceGroup.fences
      })
    },
    //当从子组件通过利用事件冒泡机制传到父组件以后捕获事件拿到矩阵的X和Y的值
    onCellTap:function(event){
      //是从自动以组件cell使用组件通信机制传上来的
      const cell = event.detail.cell
      const x = event.detail.x
      const y = event.detail.y
      const judger = this.data.judger
      judger.judge(cell,x,y)
      //那么在此点击的时候也需要在刷新一次状态，每点击一次都要刷新整个的状态
      //fence里面的cell要被正确改变了，如果你的cell跟之前的初始化的矩阵状态一样的，那么UI上面是不会变化的
      this.setData({
        fences:judger.fenceGroup.fences
      })
    }
  }
})
