import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
const triangle = require('~/assets/image/time_down.png')


export default class HomeHeader extends Component {

    itemMonth = ()=>{
        return (
            <View style={styles.itemBottom}>
                <Text style={styles.month}>1</Text>
                <Text style={styles.monthDetail}>月</Text>
                <Image source={triangle} resizeMode={'contain'} style={styles.triangle}/>
            </View>
        )
    }

    itemMoney = ()=>{
        return (
            <View style={styles.itemBottom}>
                <Text style={styles.money}>asdasd</Text>
            </View>
        )
    }

    item = (isMonth)=>{
        return (
            <View style={[styles.item, {flex: isMonth ? undefined : 1}]}>
                <Text style={styles.title}>2019</Text>
                {isMonth && this.itemMonth()}
                {!isMonth && this.itemMoney()}
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.item(true)}
                <View style={styles.line}/>
                {this.item(false)}
                {this.item(false)}
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
        height: countcoordinatesX(120),
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
    }
});