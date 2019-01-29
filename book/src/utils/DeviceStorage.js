import {
  AsyncStorage
} from 'react-native';
import { BKCModel, BKModel } from '~/services/Interfaces'
import DateExtension from '~/utils/DateExtension'
const cateList = require('~/assets/json/Category.json')
const ACA = require('~/assets/json/ACA.json')

// 存储键值
export const SAVE = {
    "PIN_FIRST_RUN": "PIN_FIRST_RUN",                                     // 第一次运行
    "PIN_CATE_SYS_HAS_PAY": "PIN_CATE_SYS_HAS_PAY",                       // 系统 - 添加的 - 支出
    "PIN_CATE_SYS_REMOVE_PAY": "PIN_CATE_SYS_REMOVE_PAY",                 // 系统 - 删除的 - 支出
    "PIN_CATE_CUS_HAS_PAY": "PIN_CATE_CUS_HAS_PAY",                       // 用户 - 添加的 - 支出
    "PIN_CATE_SYS_Has_PAY_SYNCED": "PIN_CATE_SYS_Has_PAY_SYNCED",         // 系统 - 添加的 - 支出 - 未同步(同步后应该为空)
    "PIN_CATE_SYS_REMOVE_PAY_SYNCED": "PIN_CATE_SYS_REMOVE_PAY_SYNCED",   // 系统 - 删除的 - 支出 - 未同步(同步后应该为空)
    "PIN_CATE_CUS_HAS_PAY_SYNCED": "PIN_CATE_CUS_HAS_PAY_SYNCED",         // 用户 - 添加的 - 支出 - 未同步(同步后应该为空)
    "PIN_CATE_CUS_REMOVE_PAY_SYNCED": "PIN_CATE_CUS_REMOVE_PAY_SYNCED",   // 用户 - 删除的 - 支出 - 未同步(同步后应该为空)

    "PIN_CATE_SYS_HAS_INCOME": "PIN_CATE_SYS_HAS_INCOME",                           // 系统 - 添加的 - 收入
    "PIN_CATE_SYS_REMOVE_INCOME": "PIN_CATE_SYS_REMOVE_INCOME",                     // 系统 - 删除的 - 收入
    "PIN_CATE_CUS_HAS_INCOME": "PIN_CATE_CUS_HAS_INCOME",                           // 用户 - 添加的 - 收入
    "PIN_CATE_SYS_Has_INCOME_SYNCED": "PIN_CATE_SYS_Has_INCOME_SYNCED",             // 系统 - 添加的 - 收入 - 未同步(同步后应该为空)
    "PIN_CATE_SYS_REMOVE_INCOME_SYNCED": "PIN_CATE_SYS_REMOVE_INCOME_SYNCED",       // 系统 - 删除的 - 收入 - 未同步(同步后应该为空)
    "PIN_CATE_CUS_HAS_INCOME_SYNCED": "PIN_CATE_CUS_HAS_INCOME_SYNCED",             // 用户 - 添加的 - 收入 - 未同步(同步后应该为空)
    "PIN_CATE_CUS_REMOVE_INCOME_SYNCED": "PIN_CATE_CUS_REMOVE_INCOME_SYNCED",       // 用户 - 删除的 - 收入 - 未同步(同步后应该为空)

    "PIN_ACA_CATE": "PIN_ACA_CATE",                             //  添加类别

    "PIN_BOOK": "PIN_BOOK",                                     // 记账
    "PIN_BOOK_SYNCED": "PIN_BOOK_SYNCED",                       // 记账 - 未同步

    "PIN_SETTING_SOUND": "PIN_SETTING_SOUND",                   // 声音开关
    "PIN_SETTING_DETAIL": "PIN_SETTING_DETAIL",                 // 明细详情

    "PIN_SETTING_SOUND_SYNCED": "PIN_SETTING_SOUND_SYNCED",     // 声音开关 - 未同步
    "PIN_SETTING_DETAIL_SYNCED": "PIN_SETTING_DETAIL_SYNCED",   // 明细详情 - 未同步

    "PIN_TIMING": "PIN_TIMING",                                 // 定时通知
    "PIN_TIMING_HAS_SYNCED": "PIN_TIMING_HAS_SYNCED",           // 定时添加通知 - 未同步
    "PIN_TIMING_REMOVE_SYNCED": "PIN_TIMING_REMOVE_SYNCED",     // 定时删除通知 - 未同步


    
}

export default class DeviceStorage {

    /**
     * 获取数据
     */
    static getChart = (year, month, day, week, status)=>{
        // 周
        if (status == 0) {
            
        }
        // 月
        else if (status == 1) {

        }
        // 年
        else if (status == 2) {

        }
    }

    /**
     * 获取时间范围(图表 页面)
     * @param is_income  0: 支出  1: 收入
     * @param status  0: 周  1: 月  2:  年
     */
    static getChartDateRange = async (is_income, status)=>{
        var bookArr = await DeviceStorage.load(SAVE.PIN_BOOK)
        bookArr = bookArr.filter((item, index, array)=>{
            return item.cmodel.is_income == is_income
        })
        const minDate = DeviceStorage.getMinDate(bookArr)
        const maxDate = DeviceStorage.getMaxDate(bookArr)
        // 周
        if (status == 0) {
            if (minDate == undefined || maxDate == undefined) {
                return {'index': 0, 'arr': ['本周']}
            }

            const week = DateExtension.compareWeek(minDate, maxDate)
            var arr = []
            var index = -1
            for (var i=0; i<week; i++) {
                const date = DateExtension.dateAddDay(minDate, i == 0 ? 0 : 7 * i)
                arr.push(DateExtension.dateToWeekStr(date))
                if (DateExtension.isWeekNow(date)) {
                    index = i
                }
            }
            index = index == -1 ? arr.length - 1 : index
            return {'index': index, 'arr': arr}
        }
        // 月
        else if (status == 1) {
            if (minDate == undefined || maxDate == undefined) {
                return {'index': 0, 'arr': ['本月']}
            }

            var arr = []
            var index = -1
            for (var i=minDate.getFullYear(); i<=maxDate.getFullYear(); i++) {
                const minMonth = i == minDate.getFullYear() ? minDate.getMonth() + 1 : 1
                const maxMonth = i == maxDate.getFullYear() ? maxDate.getMonth() + 1 : 12
                for (var y=minMonth; y<=maxMonth; y++) {
                    arr.push(DateExtension.dateToMonthStr(i, y))
                }
                if (DateExtension.isMonthNow(i, y)) {
                    index = arr.length - 1
                }
            }
            index = index == -1 ? arr.length - 1 : index
            return {'index': index, 'arr': arr}
        }
        // 年
        else if (status == 2) {
            if (minDate == undefined || maxDate == undefined) {
                return {'index': 0, 'arr': ['今年']}
            }

            var arr = []
            var index = -1
            for (var i=minDate.getFullYear(); i<=maxDate.getFullYear(); i++) {
                arr.push(DateExtension.dateToYearStr(i))
                if (DateExtension.isYearNow(i)) {
                    index = arr.length - 1
                }
            }
            index = index == -1 ? arr.length - 1 : index
            return {'index': index, 'arr': arr}
        }
    }   

    /**
     * 获取最小时间
     */
    static getMinDate = (array)=>{
        var minDate = undefined
        for (var i=0; i<array.length; i++) {
            const model = array[i]
            const date = DateExtension.strToDate(model.year, model.month, model.day)
            if (minDate != undefined) {
                if (minDate > date) {
                    minDate = date
                }
            } else {
                minDate = date
            }
        }
        return minDate
    }

    /**
     * 获取最大时间
     */
    static getMaxDate = (array)=>{
        var maxDate = undefined
        for (var i=0; i<array.length; i++) {
            const model = array[i]
            const date = DateExtension.strToDate(model.year, model.month, model.day)
            if (maxDate != undefined) {
                if (maxDate < date) {
                    maxDate = date
                }
            } else {
                maxDate = date
            }
        }
        return maxDate
    }

    /**
     * 获取记账信息(首页 页面)
     */
    static getBook = async (year, month, day)=>{
        // 数据
        var bookArr = await DeviceStorage.load(SAVE.PIN_BOOK)
        bookArr = bookArr.filter(function(item, index, array) {
            if (day) {
                return item.year == year && item.month == month && item.day == day
            } else if (month) {
                return item.year == year && item.month == month
            } else if (year) {
                return item.year == year
            }
            return true
        })

        // 统计数据
        var dictm = {}
        for (var i=0; i<bookArr.length; i++) {
            var model = bookArr[i]
            var date = new Date(model.year, model.month, model.day)
            var dateStr = DateExtension.dateToStr(date)            
            // 初始化
            if (Object.keys(dictm).indexOf(dateStr) == -1) {
                var submodel = {}
                submodel.list = []
                submodel.income = 0
                submodel.pay = 0
                submodel.date = dateStr
                dictm[dateStr] = submodel
            }
            // 添加数据
            var submodel = dictm[dateStr]
            submodel.list.push(model)
            // 收入
            if (model.cmodel.is_income == true) {
                submodel.income = submodel.income + model.price
            }
            // 支出
            else {
                submodel.pay = submodel.pay + model.price
            }
            dictm[dateStr] = submodel
        }

        // 排序
        var arrm = []
        for (var i=0; i<Object.keys(dictm).length; i++) {
            var subkey = Object.keys(dictm)[i]
            arrm.push(dictm[subkey])
        }
        arrm = arrm.sort((a, b)=>{
            return a.date - b.date
        })

        // 添加key
        var newarrm = []
        for (var i=0; i<arrm.length; i++) {
            var model = arrm[i]
            model.list = model.list.map((item,index) =>{
                return Object.assign(item, {key: i + '.' + index })
            })
            newarrm.push({'title': i, 'data': model.list})
        }
        
        return newarrm
    }

    /**
     * 删除记账信息(首页 页面)
     */
    static removeBook = async (model)=>{
        var bookArrm = await DeviceStorage.load(SAVE.PIN_BOOK)
        var bookSyncedArrm = await DeviceStorage.load(SAVE.PIN_BOOK_SYNCED)
        if (BKModel.indexOfObject(bookSyncedArrm, model) != -1) {
            BKModel.removeOfObject(bookSyncedArrm, model)
        }
        BKModel.removeOfObject(bookArrm, model)
        
        await DeviceStorage.save(SAVE.PIN_BOOK, bookArrm)
        await DeviceStorage.save(SAVE.PIN_BOOK_SYNCED, bookArrm)
    }

    /**
     * 添加自定义分类(添加分类 页面)
     */
    static addCusCategory = async (text, model, is_income)=>{
        var cateSysHasPayArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_HAS_PAY)
        var cateSysRemovePayArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_REMOVE_PAY)
        var cateCusHasPayArr = await DeviceStorage.load(SAVE.PIN_CATE_CUS_HAS_PAY)
        var cateCusHasPaySyncedArr = await DeviceStorage.load(SAVE.PIN_CATE_CUS_HAS_PAY_SYNCED)

        var cateSysHasIncomeArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_HAS_INCOME)
        var cateSysRemoveIncomeArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_REMOVE_INCOME)
        var cateCusHasIncomeArr = await DeviceStorage.load(SAVE.PIN_CATE_CUS_HAS_INCOME)
        var cateCusHasIncomeSyncedArr = await DeviceStorage.load(SAVE.PIN_CATE_CUS_HAS_INCOME_SYNCED)
        
        var newmodel = {
            "id": (cateSysHasPayArr.length + cateSysRemovePayArr.length + cateCusHasPayArr.length + cateSysHasIncomeArr.length + cateSysRemoveIncomeArr.length + cateCusHasIncomeArr.length + 1),
            "name": text,
            "icon_n": model.icon_n,
            "icon_l": model.icon_l,
            "icon_s": model.icon_s,
            "is_income": is_income,
            "is_system": 0,
        }

        
        // 支出
        if (is_income == false) {
            BKCModel.addObject(cateCusHasPayArr, newmodel)
            await DeviceStorage.save(SAVE.PIN_CATE_CUS_HAS_PAY, cateCusHasPayArr)

            BKCModel.addObject(cateCusHasPaySyncedArr, newmodel)
            await DeviceStorage.save(SAVE.PIN_CATE_CUS_HAS_PAY_SYNCED, cateCusHasPaySyncedArr)
        }
        // 收入
        else {
            BKCModel.addObject(cateCusHasIncomeArr, newmodel)
            await DeviceStorage.save(SAVE.PIN_CATE_CUS_HAS_INCOME, cateCusHasIncomeArr)

            BKCModel.addObject(cateCusHasIncomeSyncedArr, newmodel)
            await DeviceStorage.save(SAVE.PIN_CATE_CUS_HAS_INCOME_SYNCED, cateCusHasIncomeSyncedArr)
        }
    }

    /**
     * 获取记账分类(记账 页面)
     */
    static getCategory = async ()=>{
        var setting = {
			"id": 999,
			"icon_n": "cc_home_tools",
			"icon_l": "cc_home_tools_l",
			"icon_s": "cc_home_tools_s",
			"is_income": 0,
			"is_system": 1,
			"name": "设置"
		}

        var data1 = await DeviceStorage.load(SAVE.PIN_CATE_SYS_HAS_PAY)
        var data2 = await DeviceStorage.load(SAVE.PIN_CATE_CUS_HAS_PAY)
        var pay = [...data1, ...data2, setting]

        var data3 = await DeviceStorage.load(SAVE.PIN_CATE_SYS_HAS_INCOME)
        var data4 = await DeviceStorage.load(SAVE.PIN_CATE_CUS_HAS_INCOME)
        var income = [...data3, ...data4, setting]

        return await [pay, income]
    }

    /**
     * 类别设置(类别设置 页面)
     */
    static getCategorySet = async ()=>{
        var pay1 = await DeviceStorage.load(SAVE.PIN_CATE_SYS_HAS_PAY)
        var pay2 = await DeviceStorage.load(SAVE.PIN_CATE_CUS_HAS_PAY)
        var pay3 = await DeviceStorage.load(SAVE.PIN_CATE_SYS_REMOVE_PAY)
        var payInsert = [...pay1, ...pay2]
        var payRemove = pay3
        var pay = [{'title': 0, 'data': payInsert}, {'title': 1, 'data': payRemove}]
        

        var income1 = await DeviceStorage.load(SAVE.PIN_CATE_SYS_HAS_INCOME)
        var income2 = await DeviceStorage.load(SAVE.PIN_CATE_CUS_HAS_INCOME)
        var income3 = await DeviceStorage.load(SAVE.PIN_CATE_SYS_REMOVE_INCOME)
        var incomeInsert = [...income1, ...income2]
        var incomeRemove = income3
        var income = [{'title': 0, 'data': incomeInsert}, {'title': 1, 'data': incomeRemove}]

        var models = DeviceStorage.sortCategorySet([pay, income])
        return await models
    }
    
    /**
     * 整理类别设置key
     */
    static sortCategorySet = (models)=>{
        var newmodels = []
        for (var i=0; i<models.length; i++) {
            var submodels = models[i]
            var newsubmodels = []
            for (var y=0; y<2; y++) {
                var subdataModels = submodels[y].data
                subdataModels = subdataModels.map((item,index) =>{
                    return Object.assign(item, {key: y + '.' + index })
                })
                var newdatamodel = {'title': y, 'data': subdataModels}
                newsubmodels.push(newdatamodel)
            }
            newmodels.push(newsubmodels)
        }
        return newmodels
    }
    
    /**
     * 获取数据 (发现 页面)
     */
    static getFind = async (year, month)=>{
        const date = new Date()
        var bookArr = await DeviceStorage.load(SAVE.PIN_BOOK)
        bookArr = bookArr.filter(function(item, index, array) {
            if (month) {
                return item.year == year && item.month == month
            }
            return item.year == year
        })

        var income = 0
        var pay = 0
        bookArr.forEach((val, index, arr)=>{
            // 支出
            if (val.cmodel.is_income == 0) {
                pay += parseFloat(val.price)
            }
            // 收入
            else {
                income += parseFloat(val.price)
            }
        })

        return {'income': income, 'pay': pay, 'data': income - pay}
    }

    /**
     * 获取数据 (发现详情 页面)
     */
    static getFindDetail = async (year)=>{
        const main = await DeviceStorage.getFind(year)
        var bookArr = await DeviceStorage.load(SAVE.PIN_BOOK)
        bookArr = bookArr.filter(function(item, index, array) {
            return item.year == year
        })

        var maxMonth = 1
        if (bookArr.length == 0) {
            return {'main': main, 'data': [{ title: "title1", data: [] }]}
        }

        for (var i=0; i<bookArr.length; i++) {
            const month = bookArr[i].month
            if (maxMonth < month) {
                maxMonth = month
            }
        }
        var arr = []
        for (var i=1; i<=maxMonth; i++) {
            var param = await DeviceStorage.getFind(year, i)
            param.month = i
            arr.push(param)
        }
        return {'main': main, 'data': [{ title: "title1", data: arr }]}
    }

    /**
     * 初始化
     */
    static initialization = async ()=>{
        // 第一次运行
        const isFirst = await DeviceStorage.load(SAVE.PIN_FIRST_RUN)
        // 初始化
        if (isFirst !== 1) {
            
            // 支出
            DeviceStorage.save(SAVE.PIN_CATE_SYS_HAS_PAY, cateList.pay)
            DeviceStorage.save(SAVE.PIN_CATE_SYS_REMOVE_PAY, [])
            DeviceStorage.save(SAVE.PIN_CATE_CUS_HAS_PAY, [])
            DeviceStorage.save(SAVE.PIN_CATE_SYS_Has_PAY_SYNCED, [])
            DeviceStorage.save(SAVE.PIN_CATE_SYS_REMOVE_PAY_SYNCED, [])
            DeviceStorage.save(SAVE.PIN_CATE_CUS_HAS_PAY_SYNCED, [])
            DeviceStorage.save(SAVE.PIN_CATE_CUS_REMOVE_PAY_SYNCED, [])
            // 收入
            DeviceStorage.save(SAVE.PIN_CATE_SYS_HAS_INCOME, cateList.income)
            DeviceStorage.save(SAVE.PIN_CATE_SYS_REMOVE_INCOME, [])
            DeviceStorage.save(SAVE.PIN_CATE_CUS_HAS_INCOME, [])
            DeviceStorage.save(SAVE.PIN_CATE_SYS_Has_INCOME_SYNCED, [])
            DeviceStorage.save(SAVE.PIN_CATE_SYS_REMOVE_INCOME_SYNCED, [])
            DeviceStorage.save(SAVE.PIN_CATE_CUS_HAS_INCOME_SYNCED, [])
            DeviceStorage.save(SAVE.PIN_CATE_CUS_REMOVE_INCOME_SYNCED, [])

            // 添加类别
            DeviceStorage.save(SAVE.PIN_ACA_CATE, ACA)

            // 记账
            DeviceStorage.save(SAVE.PIN_BOOK, [])
            DeviceStorage.save(SAVE.PIN_BOOK_SYNCED, [])

            // 设置
            DeviceStorage.save(SAVE.PIN_SETTING_SOUND, 0)
            DeviceStorage.save(SAVE.PIN_SETTING_DETAIL, 0)
            DeviceStorage.save(SAVE.PIN_SETTING_SOUND_SYNCED, 0)
            DeviceStorage.save(SAVE.PIN_SETTING_DETAIL_SYNCED, 0)

            // 定时
            DeviceStorage.save(SAVE.PIN_TIMING, [])
            DeviceStorage.save(SAVE.PIN_TIMING_HAS_SYNCED, [])
            DeviceStorage.save(SAVE.PIN_TIMING_REMOVE_SYNCED, [])

            // 添加类别
            DeviceStorage.save(SAVE.PIN_FIRST_RUN, 1)
        }

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