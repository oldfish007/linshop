// Components/spu-preview/index.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:Object
  },
  /**
   * 组件的初始数据
   */
  data: {
    tags:Array
  },
  observers:{
    data:function(data){
        if(!data){
          return
        }
        if(!data.tags){
          return
        }
        const tags = data.tags.split('$')
        this.setData({
          tags
        })
    }
  },
/**
 * 组件的方法列表
*/
  methods: {
        onImgLoad(event){
            const {width,height} = event.detail
// console.log(width,height)
//width/height = 340/h  px  rpx 最终算出来是rpx还是px 取决于等号右边的340
//340*height= width*h
            this.setData({
                w:340,
                h:340*height/width
            })
        },
      onItemTap(event){
            /*
            wx.navigateTo({
                url:`/pages/detail/detail?pid=${pid}`
            })*/
          const pid = event.currentTarget.dataset.pid
          wx.navigateTo({
              url:`/pages/detail/detail?pid=${pid}`
          })
      }
  }
})
