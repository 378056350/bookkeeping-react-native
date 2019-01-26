import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import KKDatePicker from '~/common/KKDatePicker/KKDatePicker'
const triangle = require('~/assets/image/time_down.png')


export default class HomeHeader extends Component {

    // 确认时间
    _onConfirm = (year, month, day)=>{
        
    }

    itemMonth = ()=>{
        return (
            <View style={styles.itemBottom}>
                <Text style={styles.month}>{this.props.month}</Text>
                <Text style={styles.monthDetail}>月</Text>
                <Image source={triangle} resizeMode={'contain'} style={styles.triangle}/>
            </View>
        )
    }

    itemMoney = (status)=>{
        const { models } = this.props
        var income = 0
        var pay = 0
        for (var i=0; i<models.length; i++) {
            for (var y=0; y < models[i].data.length; y++) {
                var model = models[i].data[y]
                if (model.cmodel.is_income == 1) {
                    income += parseFloat(model.price)
                } else {
                    pay += parseFloat(model.price)
                }
            }
        }
        const str = status == 1 ? income : pay
        return (
            <View style={styles.itemBottom}>
                <Text style={styles.money}>{str}</Text>
            </View>
        )
    }

    item = (status)=>{
        const str = status == 0 ? this.props.year : (status == 1 ? '收入' : '支出')
        return (
            <TouchableOpacity 
                activeOpacity={1.0} 
                onPress={status == 0 ? this.onPress : undefined} 
                style={[styles.item, {flex: status == 0 ? undefined : 1}]}
            >
                <View style={{flex: 1}}>
                    <Text style={styles.title}>{str}</Text>
                    {status == 0 && this.itemMonth()}
                    {status != 0 && this.itemMoney(status)}
                </View>
            </TouchableOpacity>
        )
    }

    _onConfirm = (year, month)=>{
        this.props.onChangeDate(year, month)
    }

    // 时间选择
    onPress = ()=>{
        this.refs.picker.show()
    }

    render() {
        return (
            <View style={styles.container}>
                {this.item(0)}
                <View style={styles.line}/>
                {this.item(1)}
                {this.item(2)}
                <KKDatePicker ref={'picker'} number={2} onConfirm={this._onConfirm}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: countcoordinatesX(100),
        backgroundColor: kColor_Main_Color,
        paddingRight: countcoordinatesX(60),
        paddingLeft: countcoordinatesX(30),
    },
    itemBottom: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        fontSize: FONT_SIZE(12),
        fontWeight: '100',
        color: kColor_Text_Black,
    },
    line: {
        width: countcoordinatesX(1),
        height: countcoordinatesX(40),
        backgroundColor: kColor_Text_Black,
        marginLeft: countcoordinatesX(50),
        marginRight: countcoordinatesX(50),
    },
    month: {
        fontSize: FONT_SIZE(16),
        fontWeight: 'normal',
        color: kColor_Text_Black,
    },
    monthDetail: {
        fontSize: FONT_SIZE(12),
        fontWeight: 'normal',
        color: kColor_Text_Black,
        marginLeft: countcoordinatesX(10),
        marginTop: countcoordinatesX(5),
    },
    triangle: {
        width: countcoordinatesX(30),
        height: countcoordinatesX(30),
        marginLeft: countcoordinatesX(10),
    },
    money: {
        fontSize: FONT_SIZE(16),
        fontWeight: '100',
        color: kColor_Text_Black,
        marginTop: countcoordinatesX(5),
    }
});