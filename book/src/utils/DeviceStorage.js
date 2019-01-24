import {
  AsyncStorage
} from 'react-native';
const cateList = require('~/assets/json/Category.json')

// 存储键值
export const SAVE = {
    "PIN_FIRST_RUN": "PIN_FIRST_RUN",                       // 第一次运行
    "PIN_CATE_SYS_HAS_PAY": "PIN_CATE_SYS_HAS_PAY",         // 系统 - 添加的 - 支出
    "PIN_CATE_SYS_REMOVE_PAY": "PIN_CATE_SYS_REMOVE_PAY",   // 系统 - 删除的 - 支出
    "PIN_CATE_CUS_HAS_PAY": "PIN_CATE_CUS_HAS_PAY",         // 用户 - 添加的 - 支出
    "PIN_CATE_SYS_Has_PAY_SYNCED": "PIN_CATE_SYS_Has_PAY_SYNCED",         // 系统 - 添加的 - 支出 - 未同步(同步后应该为空)
    "PIN_CATE_SYS_REMOVE_PAY_SYNCED": "PIN_CATE_SYS_REMOVE_PAY_SYNCED",   // 系统 - 删除的 - 支出 - 未同步(同步后应该为空)
    "PIN_CATE_CUS_HAS_PAY_SYNCED": "PIN_CATE_CUS_HAS_PAY_SYNCED",         // 用户 - 添加的 - 支出 - 未同步(同步后应该为空)
    "PIN_CATE_CUS_REMOVE_PAY_SYNCED": "PIN_CATE_CUS_REMOVE_PAY_SYNCED",   // 用户 - 删除的 - 支出 - 未同步(同步后应该为空)
}



export default class DeviceStorage {

    /**
     * 初始化
     */
    static initialization = async ()=>{
        // 第一次运行
        const isFirst = await DeviceStorage.load(SAVE.PIN_FIRST_RUN)
        // 初始化
        if (isFirst !== "1") {
            // 支出
            DeviceStorage.save(SAVE.PIN_CATE_SYS_HAS_PAY, cateList.pay)
            DeviceStorage.save(SAVE.PIN_CATE_SYS_REMOVE_PAY, [])
            DeviceStorage.save(SAVE.PIN_CATE_CUS_HAS_PAY, [])
            DeviceStorage.save(SAVE.PIN_CATE_SYS_Has_PAY_SYNCED, [])
            DeviceStorage.save(SAVE.PIN_CATE_SYS_REMOVE_PAY_SYNCED, [])
            DeviceStorage.save(SAVE.PIN_CATE_CUS_HAS_PAY_SYNCED, [])
            DeviceStorage.save(SAVE.PIN_CATE_CUS_REMOVE_PAY_SYNCED, [])
            DeviceStorage.save(SAVE.PIN_FIRST_RUN, "1")
        }
        console.log("==========================");
        console.log(await DeviceStorage.load(SAVE.PIN_CATE_SYS_HAS_PAY));
        console.log("==========================");
        
    }


    /**
     * 获取
     * @param key
     * @returns {Promise<T>|*|Promise.<TResult>}
     */
    static load(key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            return jsonValue;
        });
    }


    /**
     * 保存
     * @param key
     * @param value
     * @returns {*}
     */
    static save(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }


    /**
     * 更新
     * @param key
     * @param value
     * @returns {Promise<T>|Promise.<TResult>}
     */
    static update(key, value) {
        return DeviceStorage.get(key).then((item) => {
            value = typeof value === 'string' ? value : Object.assign({}, item, value);
            return AsyncStorage.setItem(key, JSON.stringify(value));
        });
    }


    /**
     * 删除
     * @param key
     * @returns {*}
     */
    static delete(key) {
        return AsyncStorage.removeItem(key);
    }

}