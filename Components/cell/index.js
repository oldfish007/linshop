// Components/cell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     cell:Object,
     y:Number,
     x:Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   * 第三个参数，触发事件的选项
   * 在cell里面产生了一个原生的事件，然后在用triggerEvent
   * 自定义组件触发事件时，需要使用 triggerEvent 方法，指定事件名、detail对象和事件选项：
   * 组件件的通信需要把子组件的数据传递给外层组件 composed：事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部
   * bubbles ：事件是否冒泡
   */
  methods: {
    onTap(event){
      this.triggerEvent('celltap',{
          cell:this.properties.cell,
          x:this.properties.x,
          y:this.properties.y
      },{
        bubbles:true,
        composed:true
      })
    }
  }
})
