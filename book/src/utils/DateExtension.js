
export default class DateExtension {
    // 日期 转 '2018-12-12'
    static dateToStr = (Date)=>{
        var str = '-'
        var obj = {
            Y: Date.getFullYear(),
            M: Date.getMonth() + 1,
            D: Date.getDate(),
            H: Date.getHours(),
            Mi: Date.getMinutes(),
            S: Date.getSeconds()
        }
        return obj.Y + '-' + DateExtension.supplement(obj.M) + '-' + DateExtension.supplement(obj.D)
    }

    // 年/月/日 转 日期
    static strToDate = (year, month, day)=>{
        const date = new Date(year + '-' + DateExtension.supplement(month) + '-' + DateExtension.supplement(day))
        return date
    }

    // 1月 转 01月
    static supplement = (nn)=>{
        return nn = nn < 10 ? '0' + nn : nn;
    }

    // 日期 转 周描述
    static dateToWeekStr = (date)=>{
        const week = DateExtension.getWeek(date)
        const year = date.getFullYear()

        const now = new Date()
        const nowYear = now.getFullYear()
        const nowWeek = DateExtension.getWeek(now)

        const last = DateExtension.dateAddDay(new Date(), -7)
        const lastYear = last.getFullYear()
        const lastWeek = DateExtension.getWeek(last)

        if (nowYear == year && nowWeek == week) {
            return '本周'
        } else if (lastYear == year && lastWeek == week) {
            return '上周'
        }
        return year + '-' + DateExtension.supplement(week) + '周'
    }

    // 日期 转 月描述
    static dateToMonthStr = (year, month)=>{
        const now = new Date()
        const nowYear = now.getFullYear()
        const nowMonth = now.getMonth() + 1

        const last = DateExtension.dateAddMonth(now, -1)
        const lastYear = last.getFullYear()
        const lastMonth = last.getMonth() + 1

        if (nowYear == year && nowMonth == month) {
            return '本月'
        } 
        if (lastYear == year && lastMonth == month) {
            return '上月'
        } 
        return year + '-' + DateExtension.supplement(month) + '月'
    }

    // 日期 转 年描述
    static dateToYearStr = (year)=>{
        const now = new Date()
        const last = DateExtension.dateAddYear(now, -1)
        if (now.getFullYear() == year) {
            return '今年'
        } 
        if (last.getFullYear() == year) {
            return '去年'
        } 
        return year + '年'
    }

    // 是否是当前年
    static isYearNow = (year)=>{
        const date = new Date()
        if (date.getFullYear() == year) {
            return true
        }
        return false
    }

    // 是否是当前月
    static isMonthNow = (year, month)=>{
        const date = new Date()
        if (date.getFullYear() == year && (date.getMonth() + 1) == month) {
            return true
        }
        return false
    }

    // 是否是当前周
    static isWeekNow = (date)=>{
        const now = new Date()
        const nowWeek = DateExtension.getWeek(now)
        const week = DateExtension.getWeek(date)
        if (date.getFullYear() == now.getFullYear() && nowWeek == week) {
            return true
        }
        return false
    }

    // 日期在当年的第几周
    static getWeek = (dt)=>{
        dt = DateExtension.dateAddDay(dt, 0)
        let d1 = new Date(dt);
        let d2 = new Date(dt);
        d2.setMonth(0);
        d2.setDate(1);
        let rq = d1 - d2;
        let days = Math.ceil(rq/(24*60*60*1000));
        let num = Math.ceil(days/7);
        return num;
    }

    // 两个日期 间隔周数
    static compareWeek = (date1, date2)=>{
        var day = DateExtension.datedifference(date1, date2)
        if (date1.getDay() != 1) {
            day += date1.getDay() - 1
        }
        if (date2.getDay() != 7) {
            day += 8 - date2.getDay()
        }
        const week = day / 7
        return week
    }

    // 两个日期 天数差
    static datedifference = (sDate1, sDate2)=>{  
        var dateSpan, iDays;
        sDate1 = Date.parse(sDate1);
        sDate2 = Date.parse(sDate2);
        dateSpan = sDate2 - sDate1;
        dateSpan = Math.abs(dateSpan);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays
    };

    // 日期 转 星期
    static week = (date)=>{
        var a = new Array("日", "一", "二", "三", "四", "五", "六");  
        var week = date.getDay();  
        var str = "星期"+ a[week];  
        return str
    }

    // 是否是今天
    static isToday = (date)=>{
        const now = new Date()
        if (date.getFullYear() == now.getFullYear() && 
            date.getMonth() == now.getMonth() &&
            date.getDate() == now.getDate()) {
            return true
        }
        return false
    }

    // 日期加一天
    static dateAddDay(dateTime, day) {
        var date = new Date(dateTime)
        date.setDate(dateTime.getDate() + day);
        return date
    }

    // 日期加一月
    static dateAddMonth(dateTime, month) {
        var date = new Date(dateTime)
        date.setMonth(dateTime.getMonth() + month);
        return date
    }

    // 日期加一年
    static dateAddYear(dateTime, year) {
        var date = new Date(dateTime)
        date.setFullYear(dateTime.getFullYear() + year);
        return date
    }


    // 2019-02周 获取周信息 
    static weekToStr = (str)=>{
        if (str === '本周') {
            const date = new Date()
            return {year: date.getFullYear(), week: DateExtension.getWeek(date), count: 7}
        } else if (str === '上周') {
            const date = new Date()
            var last = DateExtension.dateAddDay(date, -7)
            return {year: date.getFullYear(), week: DateExtension.getWeek(last), count: 7}
        } else {
            str = str.replace('周', '');
            var year = parseFloat(str.split('-')[0])
            var week = parseFloat(str.split('-')[1])
            return {year: year, week: week, count: 7}
        }
    }

    // 2019-02月 获取月信息 
    static monthToStr = (str)=>{
        if (str === '本月') {
            const date = new Date()
            const month = new Date(date.getFullYear(), date.getMonth() + 1, 0)
            return {year: date.getFullYear(), month: date.getMonth() + 1, count: month.getDate()}
        } else if (str === '上月') {
            const date = new Date()
            const last = DateExtension.dateAddMonth(date, -1)
            const month = new Date(last.getFullYear(), last.getMonth() + 1, 0)
            return {year: last.getFullYear(), month: last.getMonth() + 1, count: month.getDate()}
        } else {
            str = str.replace('月', '');
            var year = parseFloat(str.split('-')[0])
            var month = parseFloat(str.split('-')[1])
            const monthDate = new Date(year, month, 0)
            return {year: year, month: week, count: monthDate.getDate()}
        }
    }

    // 2019年 获取年信息 
    static yearToStr = (str)=>{
        if (str === '今年') {
            const date = new Date()
            return {year: date.getFullYear(), count: 12}
        } else if (str === '去年') {
            const date = new Date()
            var last = DateExtension.dateAddMonth(date, -1)
            return {year: last.getFullYear(), count: 12}
        } else {
            str = str.replace('年', '');
            return {year: parseFloat(str), count: 12}
        }
    }

}