// pages/home/home.js

import {Theme} from "../../models/theme";
import {Banner} from "../../models/banner";
import {Category} from "../../models/category";
import {Activity} from "../../models/Activity";
import {SpuPaging} from "../../models/spu-paging";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA:null,
        themeE:null,
        themeESpu:null,
        themeH:null,
        bannerB:null,
        bannerG:null,
        grid:[],
        ActivityD:null,
        spuPaging:null,
        loadingType:'loading'
    },

    /**
     * 生命周期函数--监听页面加载
     * es6的写法
     */
     async onLoad () {
      this.initAllData()
      this.initBottomSpuList()
     },
     async initBottomSpuList(){
        //实例化paging对象
         const paging =  SpuPaging.getlatestPaging()
         this.data.spuPaging = paging
         const data = await paging.getMoreData()
         if(!data){
             return
         }
         //确实拿到了data,怎么把data传到spu-preview
         //传进去的是数组，water-flow内部会自动处理一个一个元素传入组件内部
         wx.lin.renderWaterFlow(data.items)
     },
    /**es6的写法
     * **/
       async initAllData() {
        //const themeA = await Theme.getHomeLocationA();
        //const themes = await Theme.getThemes();
        const theme = new Theme()
        //theme对象里面themes[]数组就有值了
        //需要等待接口返回的数据
        await theme.getThemes()
        //不用关注具体的业务了
        const themeA =  theme.getHomeLocationA()
        const themeE =  theme.getHomeLocationE()
        const themeF =  theme.getHomeLocationF()
        const themeH =  theme.getHomeLocationH()
        let themeESpu=[]
        if(themeE.online){
            //这个await就必须得有，因为要等等待getThemeSpuByName(Theme.locationE)返回数据
            const data = await Theme.getHomeLocationESpu();
            if(data){
                themeESpu = data.spu_list.slice(0,8)
            }
        }
        //await等待返回的数据结果
        const bannerB = await Banner.getLocationB();
        const bannerG = await Banner.getLocationG()
        const grid = await Category.getHomeLocationC();
        const ActivityD = await Activity.getLocationD();
        //太频繁的setData性能是不好的,最好是把所有的数据一次性都取到在一次性的setdata
        //保证调用方 调用过程是简单的
        this.setData({
          themeA,
          themeE,
          themeESpu,//把这个截取的列表传入组件就好了
          themeF,
          themeH,
          bannerB,
          bannerG,
          grid,
          ActivityD
        })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: async function () {
        const data = await this.data.spuPaging.getMoreData()
        if (!data) {
            return
        }
        wx.lin.renderWaterFlow(data.items)
        if(!data.moreData){
            this.setData({
                loadingType:'end',

            })
        }

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     * 传统的es5的写法
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },



    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})