import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
const ad_arrow = require('~/assets/image/ad_arrow.png')

export default class FindCell extends Component {

    header = ()=>{
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>账单</Text>
                <Image source={ad_arrow} resizeMode={'contain'} style={styles.headerIcon}/>
            </View>
        )
    }
    bootom = ()=>{
        return (
            <View style={styles.bottom}>
                {this.bottomMonth()}
                {this.bottomLine()}
                {this.bottomInfo('收入', '0.00')}
                {this.bottomInfo('支出', '0.00')}
                {this.bottomInfo('结余', '0.00')}
            </View>
        )
    }
    bottomMonth = ()=>{
        return (
            <View style={styles.bM}>
                <Text style={styles.bMMonth}>01</Text>
                <Text style={styles.bMText}>月</Text>
            </View>
        )
    }
    bottomLine = ()=>{
        return (
            <View style={styles.bLine}/>
        )
    }
    bottomInfo = (name, detail)=>{
        return (
            <View style={styles.bI}>
                <Text style={styles.bIName}>{name}</Text>
                <Text style={styles.bIDetail}>{detail}</Text>
            </View>
        )
    }
    render() {
        return (
            <TouchableHighlight onPress={this.props.onPress} underlayColor={kColor_BG}>
                <View style={styles.container}>
                    {this.header()}
                    {this.bootom()}
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: SCREEN_WIDTH,
        height: countcoordinatesX(200),
        paddingTop: countcoordinatesX(20),
    },
    header: {
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: countcoordinatesX(30),
        paddingRight: countcoordinatesX(30),
    },
    headerText: {
        fontSize: FONT_SIZE(14),
        color: kColor_Text_Black,
    },
    headerIcon: {
        width: countcoordinatesX(30),
    },
    bottom: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        paddingLeft: countcoordinatesX(30),
        paddingRight: countcoordinatesX(30),
    },
    bM: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bMMonth: {
        color: kColor_Text_Black,
        fontSize: FONT_SIZE(18),
        fontWeight: '400',
    },
    bMText: {
        color: kColor_Text_Black,
        fontSize: FONT_SIZE(14),
        fontWeight: '300',
        marginLeft: countcoordinatesX(10),
    },
    bLine: {
        width: countcoordinatesX(1),
        height: countcoordinatesX(30),
        marginLeft: countcoordinatesX(40),
    },
    bI: {
        flex: 1,
        alignItems: 'center',
    },
    bIName: {
        fontSize: FONT_SIZE(14),
        fontWeight: '300',
        color: kColor_Text_Black,
    },
    bIDetail: {
        fontSize: FONT_SIZE(14),
        fontWeight: '400',
        color: kColor_Text_Black,
        marginTop: countcoordinatesX(10),
    }
});