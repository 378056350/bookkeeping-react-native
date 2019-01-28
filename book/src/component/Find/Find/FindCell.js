import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableHighlight,
    DeviceEventEmitter,
    StyleSheet
} from 'react-native';
import DeviceStorage from '~/utils/DeviceStorage'
import DateExtension from '~/utils/DateExtension'
const ad_arrow = require('~/assets/image/ad_arrow.png')

export default class FindCell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {'income': 0, 'pay': 0, 'data': 0}
        }
    }

    componentDidMount = () => {
        DeviceEventEmitter.addListener(EVENT.ADD_BOOK_EVENT, this.getData);
        DeviceEventEmitter.addListener(EVENT.REMOVE_BOOK_EVENT, this.getData);
        this.getData()
    }
    componentWillUnmount = () => {
        DeviceEventEmitter.removeListener(EVENT.ADD_BOOK_EVENT, this.getData)
        DeviceEventEmitter.removeListener(EVENT.REMOVE_BOOK_EVENT, this.getData)
    }

    getData = async ()=>{
        const date = new Date()
        this.setState({
            data: await DeviceStorage.getFind(date.getFullYear(), date.getMonth() + 1)
        })
    }

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
                {this.bottomInfo('收入', this.state.data.income.toFixed(2))}
                {this.bottomInfo('支出', this.state.data.pay.toFixed(2))}  
                {this.bottomInfo('结余', this.state.data.data.toFixed(2))}
            </View>
        )
    }
    bottomMonth = ()=>{
        const date = new Date()
        const month = DateExtension.supplement(date.getMonth() + 1)
        return (
            <View style={styles.bM}>
                <Text style={styles.bMMonth}>{month}</Text>
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