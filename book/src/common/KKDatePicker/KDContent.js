import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Animated,
    Picker,
    StyleSheet
} from 'react-native';
import KDHeader from './KDHeader'


export default class KDContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: undefined,
            month: undefined,
            day: undefined,
        }   
    }

    // 设置日期
    setDate = (year, month, day)=>{
        this.setState({
            year: year,
            month: month, 
            day: day,
        })
        setTimeout(() => {
            this._onConfirm()
        }, 0);
    }

    // 日期改变
    _onValueChange = (itemValue, itemIndex, section)=>{
        
        if (section == 1) {
            this.setState({year: itemValue})
            const minDate = new Date(this.props.minDate)
            const maxDate = new Date(this.props.maxDate)
            
            if (parseInt(itemValue) == minDate.getFullYear() && 
                parseInt(this.state.month) < (minDate.getMonth() + 1)) {
                this.setState({month: (minDate.getMonth() + 1) + ""})
            }
            if (parseInt(itemValue) == minDate.getFullYear() &&
                parseInt(this.state.month) <= (minDate.getMonth() + 1) &&
                parseInt(this.state.day) < minDate.getDate()) {
                this.setState({day: minDate.getDate() + ""})
            }

            if (parseInt(itemValue) == maxDate.getFullYear() && 
                parseInt(this.state.month) > (maxDate.getMonth() + 1)) {
                this.setState({month: (maxDate.getMonth() + 1) + ""})
            }
            if (parseInt(itemValue) == maxDate.getFullYear() &&
                parseInt(this.state.month) >= (maxDate.getMonth() + 1) &&
                parseInt(this.state.day) > maxDate.getDate()) {
                this.setState({day: maxDate.getDate() + ""})
            }


        } else if (section == 2) {
            this.setState({month: itemValue})
            const minDate = new Date(this.props.minDate)
            const maxDate = new Date(this.props.maxDate)
            if (parseInt(this.state.year) == minDate.getFullYear() &&
                parseInt(itemValue) == (minDate.getMonth() + 1)) {
                this.setState({day: minDate.getDate()})
            }
            if (parseInt(this.state.year) == maxDate.getFullYear() &&
                parseInt(itemValue) == (maxDate.getMonth() + 1)) {
                this.setState({day: maxDate.getDate()})
            }



        } else if (section == 3) {
            this.setState({day: itemValue})
        }
    }

    // 确定
    _onConfirm = ()=>{
        this.props.onConfirm(this.state.year, this.state.month, this.state.day)
    }

    picker = ()=>{
        const minDate = new Date(this.props.minDate)
        const maxDate = new Date(this.props.maxDate)
        const defaultDate = new Date(this.props.defaultDate)

        
        var arr = []
        for (let i=1; i<=this.props.number; i++) {
            var subarr = []
            var subarrview = []
            var selectValue = 0
            var min = 0
            var max = 0
            // 年
            if (i == 1) {
                min = minDate.getFullYear()
                max = maxDate.getFullYear()
                if (this.state.year == undefined) {
                    selectValue = defaultDate.getFullYear() + ""
                    this.setState({year: selectValue})
                } else {
                    selectValue = this.state.year
                }
            }
            // 月
            else if (i == 2) {
                min = 1
                max = 12
                
                if (minDate.getFullYear() == parseInt(this.state.year)) {
                    min = minDate.getMonth() + 1
                }
                if (maxDate.getFullYear() == parseInt(this.state.year)) {
                    max = maxDate.getMonth() + 1
                }
                
                if (this.state.month == undefined) {
                    selectValue = (defaultDate.getMonth() + 1) + ""
                    this.setState({month: selectValue})
                } else {
                    selectValue = this.state.month
                }
            }
            // 日
            else if (i == 3) {
                var date = new Date(parseInt(this.state.year), parseInt(this.state.month), 0)

                if ((minDate.getFullYear() == this.state.year) &&
                    ((minDate.getMonth() + 1) == this.state.month)) {
                    min = minDate.getDate()
                } else {
                    min = 1
                }

                if ((maxDate.getFullYear() == this.state.year) &&
                    ((maxDate.getMonth() + 1) == this.state.month)) {
                    max = maxDate.getDate()
                } else {
                    max = date.getDate()
                }

                if (this.state.day == undefined) {
                    selectValue = defaultDate.getDate() + ""
                    this.setState({day: selectValue})
                } else {
                    selectValue = this.state.day
                }
            }

            for (let y=min; y<=max; y++) {
                var str = y + ""
                subarr.push(str)
                subarrview.push(<Picker.Item key={y} label={str} value={str} />)
            }


            arr.push(
                <Picker
                    key={i}
                    selectedValue={selectValue}
                    style={styles.picker}
                    itemStyle={styles.item} 
                    onValueChange={(itemValue, itemIndex)=>{this._onValueChange(itemValue, itemIndex, i)}}
                >
                    {subarrview}
                </Picker>
            )
        }
        return arr
    }

    render() {
        return (
            <Animated.View style={[styles.container, {...this.props.style}]}>
                <KDHeader onCancle={this.props.onCancle} onConfirm={this._onConfirm}/>
                <View style={styles.pickerContent}>
                    {this.picker()}
                </View>
            </Animated.View>
        );
    }
}




// 日期格式化
export const format = (fmt, date)=>{
    var o = {   
        "M+" : date.getMonth()+1,                 //月份   
        "d+" : date.getDate(),                    //日   
        "h+" : date.getHours(),                   //小时   
        "m+" : date.getMinutes(),                 //分   
        "s+" : date.getSeconds(),                 //秒   
        "q+" : Math.floor((date.getMonth()+3)/3), //季度   
        "S"  : date.getMilliseconds()             //毫秒   
    };   
    if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
    for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt))   
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
    return fmt;   
}

// 获取当前月份天数
export const getMonthDays = (da)=>{
    var date = new Date(da.getFullYear(), da.getMonth() + 1, 0)
    return date.getDate()
}




const date = new Date()
KDContent.propTypes = {
    number: PropTypes.number.isRequired,
    minDate: PropTypes.string.isRequired,
    maxDate: PropTypes.string.isRequired,
    defaultDate: PropTypes.string.isRequired,
    onCancle: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
}
KDContent.defaultProps = {
    number: 1,
    minDate: '2000-02-23',
    maxDate: '2019-05-28',
    defaultDate: format("yyyy-MM-dd", date),
    onCancle: ()=>{},
    onConfirm: ()=>{}
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        left: 0,
        width: SCREEN_WIDTH,
        height: countcoordinatesX(500) + SAFE_AREA_BOTTOM_HEIGHT,
        backgroundColor: 'white',
    },
    pickerContent: {
        flexDirection: 'row',
    },
    picker: {
        flex: 1,
    },
    item: {
        fontSize: FONT_SIZE(16),
        fontWeight: '400',
        color: kColor_Text_Black,
    }
});