
export default class DateExtension {
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


}