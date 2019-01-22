import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Picker,
    Text,
    StyleSheet
} from 'react-native';
import KDHeader from './KDHeader'




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


export default class KDContent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            year: 0,
            month: 0,
            day: 0
        }
    }


    _onValueChange = (itemValue, itemIndex, section)=>{
        if (section == 1) {
            // this.setState({year: itemValue})
            // const minDate = this.props.minDate
            // const maxDate = this.props.maxDate
            // if (itemValue == minDate.getFullYear() && this.state.month < (minDate.getMonth() + 1)) {
            //     this.setState({month: (minDate.getMonth()+1) + ""})
            // }
            // else if (itemValue == maxDate.getFullYear() && this.state.month > (maxDate.getMonth() + 1)) {
            //     this.setState({month: (maxDate.getMonth()+1) + ""})
            // }
        } else if (section == 2) {
            // this.setState({month: itemValue})
        } else if (section == 3) {
            // this.setState({day: itemValue})
        }
    }
   
    picker = ()=>{
        
        const minDate = new Date(this.props.minDate)
        const maxDate = new Date(this.props.maxDate)
        const selectDate = new Date(this.props.selectDate)
        
        var arr = []
        for (let i=1; i<=this.props.number; i++) {

            var subarr = []
            var subarrview = []
            var selectValue = 0
            // 年
            if (i == 1) {
                for (var y=minDate.getFullYear(); y<=maxDate.getFullYear(); y++) {
                    var str = y + ""
                    subarr.push(str)
                    subarrview.push(
                        <Picker.Item key={y} itemStyle={styles.item} label={str} value={str} />
                    )
                }
                this.setState({
                    year: selectDate.getFullYear() + ""
                })
                selectValue = selectDate.getFullYear() + ""
            }
            // 月
            else if (i == 2) {
            //     var minMonth = 1
            //     var maxMonth = 12
            //     if (minDate.getFullYear() == this.state.year) {
            //         minMonth = minDate.getMonth() + 1
            //     }
            //     if (maxDate.getFullYear() == this.state.year) {
            //         maxMonth = maxDate,getMonth() + 1
            //     }



            //    for (var y=minMonth; y<=maxMonth; y++) {
            //         var str = y + ""
            //         subarr.push(str)
            //         subarrview.push(
            //             <Picker.Item key={y} itemStyle={styles.item} label={str} value={str} />
            //         )
            //    } 
            //    this.setState({
            //        month: selectDate.getMonth() + 1
            //    })
            //    selectValue = selectDate.getMonth() + 1
            }
            // 日
            else if (i == 3) {
            //     for (var y=1; y<=31; y++) {
            //         var str = y + ""
            //         subarr.push(str)
            //         subarrview.push(
            //             <Picker.Item key={y} itemStyle={styles.item} label={str} value={str} />
            //         )
            //    } 
            //    this.setState({
            //        day: selectDate.getDate()
            //    })
            //    selectValue = selectDate.getDate()
            }

            arr.push(
                <Picker
                    key={i}
                    selectedValue={selectValue+""}
                    style={styles.picker}
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
            <View style={styles.container}>
                <KDHeader/>
                <View style={styles.pickerContent}>
                    {this.picker()}
                </View>
            </View>
        );
    }


}



const date = new Date()
KDContent.propTypes = {
    number: PropTypes.number.isRequired,
    minDate: PropTypes.string.isRequired,
    maxDate: PropTypes.string.isRequired,
    selectDate: PropTypes.string.isRequired,
}
KDContent.defaultProps = {
    number: 1,
    minDate: '2000-01-01',
    // maxDate: date.getFullYear()+'-12-31',
    maxDate: format("yyyy-MM-dd", date),
    selectDate: format("yyyy-MM-dd", date)
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: SCREEN_WIDTH,
        height: countcoordinatesX(400) + STATUS_TABBAR_HEIGHT,
        backgroundColor: 'white',
    },
    pickerContent: {
        flexDirection: 'row',
    },
    picker: {
        flex: 1,
    },
    item: {
        fontSize: FONT_SIZE(14),
        fontWeight: '300',
        color: kColor_Line_Color,
    }
});