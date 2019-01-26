import DeviceStorage from '~/utils/DeviceStorage'


// 记账信息
export const BKModel = {
  // id: 0,                  // id
  // category_id: 0,         // 分类
  // price: 0,               // 价格
  // year: 0,                // 年
  // month: 0,               // 月
  // day: 0,                 // 日
  // week: 0,                // 周
  // mark: "",               // 备注
  // dateStr: "",            // 日期字符串
  // date: new Date(),       // 日期
  // dateNumber: 0,          // 日期数字
  // cmodel: new BKCModel(), // 分类modal

  getId: async ()=>{
    var id = await DeviceStorage.load("BOOK_ID")
    if (id == null) {
      await DeviceStorage.save("BOOK_ID", 1)
      return 1
    }
    await DeviceStorage.save("BOOK_ID", id + 1)
    return id
  },

  // 对象在数组所在的位置
  indexOfObject: (array, obj)=>{
    for (var i=0; i<array.length; i++) {
      if (array[i].id === obj.id) {
        return i
      }
    }
    return -1
  },

  // 删除数组中的对象
  removeOfObject: (array, obj)=>{
    for (var i=0; i<array.length; i++) {
      if (array[i].id === obj.id) {
        array.splice(i, 1); 
      }
    }
  },

  // 根据index删除对象
  removeObjectAtIndex: (array, index)=>{
    if (array.length > index) {
      array.splice(index, 1);
    }
  },

  // 添加对象
  addObject: (array, obj)=>{
    array.push(obj)
  }

}

// 分类信息
export const BKCModel = {
  // id: 0,
  // name: "",
  // icon_n: "",
  // icon_l: "",
  // icon_s: "",
  // is_income: false,
  // is_system: false,


  // 对象在数组所在的位置
  indexOfObject: (array, obj)=>{
    for (var i=0; i<array.length; i++) {
      if (array[i].id === obj.id) {
        return i
      }
    }
    return -1
  },

  // 删除数组中的对象
  removeOfObject: (array, obj)=>{
    for (var i=0; i<array.length; i++) {
      if (array[i].id === obj.id) {
        array.splice(i, 1); 
      }
    }
  },

  // 根据index删除对象
  removeObjectAtIndex: (array, index)=>{
    if (array.length > index) {
      array.splice(index, 1);
    }
  },

  // 添加对象
  addObject: (array, obj)=>{
    array.push(obj)
  }


  
}

// 数据统计(首页)
export const BKMonthModal = {

}

// 数据统计(图表)
export const BKChartModal = {

}




// export interface RTGankResult {
//   error: boolean;
//   results: Array<RTWeal>;
// }

// export interface RTWeal {
//   _id: string;
//   createdAt: string;
//   desc: string;
//   images: Array<string>;
//   publishedAt: string;
//   source: string;
//   type: string;
//   url: string;
//   largeUrl: string;
//   used: boolean;
//   who: string;
//   height: number;
//   width: number;
// }

// /** @desc 不得姐总数据源 */
// export interface RTBDJResult {
//   info: RTBDJInfo;
//   list: Array<RTBDJList>;
//   // list: RTBDJList[];
// }

// /** @desc 不得姐单条数据 */
// export interface RTBDJList {
//   id: string;
//   type: string;
//   text: string;
//   user_id: string;
//   name: string;
//   screen_name: string;
//   profile_image: string;
//   created_at: string;
//   create_time: string;
//   passtime: string;
//   love: string;
//   hate: string;
//   comment: string;
//   repost: string;
//   bookmark: string;
//   bimageuri: string;
//   voiceuri: string;
//   voicetime: string;
//   voicelength: string;
//   status: string;
//   theme_id: string;
//   theme_name: string;
//   theme_type: string;
//   videouri: string;
//   videotime: string;
//   original_pid: string;
//   cache_version: string;
//   playcount: string;
//   playfcount: string;
//   cai: string;
//   top_cmt: Array<any>;
//   weixin_url: string;
//   themes: Array<any>;
//   image1: string;
//   image2: string;
//   is_gif: string;
//   image0: string;
//   image_small: string;
//   cdn_img: string;
//   width: number;
//   height: number;
//   tag: string;
//   t: string;
//   ding: string;
//   favourite: string;
//   isLongPicture: boolean;
//   imageHeight: number;
//   containerHeight: number;
//   gifFistFrame: string;

//   userInfoData: UserInfo | any;
//   toolBarData: ToolBar | any;
//   jokeData: Joke | any;
//   pictureData: Picture | any;
// }

// /** @desc 不得姐参数 */
// export interface RTBDJInfo {
//   vendor: string;
//   count: number;
//   page: number;
//   maxid: string;
//   maxtime: string;
// }

// /** @desc 用户信息 */
// export interface UserInfo extends RTBDJList {
//   profile_image: string;
//   name: string;
//   passtime: string;
//   // [...RTBDJList]
// }

// /** @desc 底部功能条 */
// export interface ToolBar extends RTBDJList {
//   love: string;
//   hate: string;
//   repost: string;
//   comment: string;
// }

// /** @desc 笑话 */
// export interface Joke extends RTBDJList {
//   text: string;
// }

// /** @desc 图片 */
// export interface Picture extends RTBDJList {
//   cdn_img: string;
//   height: number;
//   width: number;
//   isLongPicture: boolean;
//   imageHeight: number;
//   containerHeight: number;
//   weixin_url: string;
//   gifFistFrame: string;
// }
