import {Http} from "../utils/Http";

/**
 * @Description: 业务对象  theme banner spu address user
 * @author Howard zheng
 * @date
 * [{
	"id": 1,
	"title": "清凉一夏，折扣季",
	"description": "首页顶部入口",
	"name": "t-1",
	"entrance_img": "",
	"extend": null,
	"internal_top_img": null,
	"title_img": null,
	"tpl_name": null,
	"online": true
}, {
	"id": 4,
	"title": "每周上新",
	"description": "新品推荐",
	"name": "t-2",
	"entrance_img": null,
	"extend": null,
	"internal_top_img": null,
	"title_img": "",
	"tpl_name": null,
	"online": true
}]
*/

 class Theme{
//接收一个回调函数
    static locationA='t-1'
    static locationE='t-2'
    static locationF='t-3'
    static locationH='t-4'
    themes = []
    async getThemes() {
        const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
        const themes = await Http.request({
            url: `theme/by/names`,
            data:{
                names
            }
        })
       this.themes = themes
    }
//更改成实例方法
     getHomeLocationA() {
        return this.themes.find(t => t.name === Theme.locationA)
     }
     getHomeLocationE() {
        return this.themes.find(t => t.name === Theme.locationE)
     }
     getHomeLocationF() {
        return this.themes.find(t => t.name === Theme.locationF)
     }
     getHomeLocationH() {
        return this.themes.find(t => t.name === Theme.locationH)
     }
     static  getHomeLocationESpu(){
        return Theme.getThemeSpuByName(Theme.locationE);
     }
     static  getThemeSpuByName(name){
        return  Http.request({
            url:`theme/name/${name}/with_spu`
        })
     }
}
export {
    Theme
}