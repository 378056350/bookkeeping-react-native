import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import DateExtension from '~/utils/DateExtension'

export default class HomeSubHeader extends Component {

    render() {
        const { model } = this.props
        const year = DateExtension.supplement(model.data[0].year)
        const month = DateExtension.supplement(model.data[0].month) - 1
        const day = DateExtension.supplement(model.data[0].day)
        const dateStr = month + "月" + day + "日"
        const date = new Date(year, month, day)
        const week = DateExtension.week(date)

        var income = 0
        var pay = 0
        for (var i=0; i<model.data.length; i++) {
            var submodel = model.data[i]
            // 收入
            if (submodel.cmodel.is_income == true) {
                income += parseFloat(submodel.price)
            }
            // 支出
            else {
                pay += parseFloat(submodel.price)
            }
        }
        var str = ""
        if (income != 0) {
            str += "收入: " + income
        }
        if (income != 0 && pay != 0) {
            str += "     "
        }
        if (pay != 0) {
            str += "支出: " + pay
        }


        return (
            <View style={styles.container}>
                <View style={styles.contentLeft}>
                    <Text style={styles.name}>{dateStr}</Text>
                    <Text style={[styles.name,  {marginLeft: countcoordinatesX(20)}]}>{week}</Text>
                </View>
                <Text style={styles.name}>{str}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: countcoordinatesX(80),
        paddingLeft: countcoordinatesX(30),
        paddingRight: countcoordinatesX(30),
        borderBottomColor: kColor_Line_Color,
        borderBottomWidth: countcoordinatesX(1),
    },
    contentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: FONT_SIZE(12),
        fontWeight: 'normal',
        fontFamily: 'Helvetica Neue',
        color: kColor_Text_Gray,
    }
});