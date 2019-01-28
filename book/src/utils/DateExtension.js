
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

    static supplement = (nn)=>{
        return nn = nn < 10 ? '0' + nn : nn;
    }

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


}