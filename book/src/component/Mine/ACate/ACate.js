import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    DeviceEventEmitter,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import ACateGlobal from './ACateGlobal'
import ACHeader from './ACHeader'
import ACTable from './ACTable'
import Toast, {DURATION} from 'react-native-easy-toast'
import DeviceStorage, {SAVE} from '~/utils/DeviceStorage'
const ACA = require('~/assets/json/ACA.json')


export default class ACate extends Component {

    /**
		// ,
		// {
		// 	"id": 999,
		// 	"icon_n": "cc_home_tools",
		// 	"icon_l": "cc_home_tools_l",
		// 	"icon_s": "cc_home_tools_s",
		// 	"is_income": 0,
		// 	"is_system": 1,
		// 	"name": "设置"
		// }
		*/

    constructor(props) {
        super(props);
        this.state = {
            choose: {section: 0, row: 0},
            text: ''
        }
    }


    // 改变文字
    _onChangeText = (text)=>{
        this.setState({text: text})
    }
    
    // 点击item
    _onPress = (row, section)=>{
        this.setState({choose: {section: section, row: row}})
        
    }

    // 完成
    _onComplete = async ()=>{
        // 判断
        this.refs.header.blur()
        const text = this.state.text
        const model = ACA[this.state.choose.section].list[this.state.choose.row]
        const is_income = this.props.navigation.state.params.isIncome
        if (text.length == 0) {
            this.refs.toast.show('类别名称不能为空', 500)
            return 
        }
        this.refs.toast.show('添加中', DURATION.FOREVER)
        // 添加分类
        await DeviceStorage.addCusCategory(text, model, is_income)
        // 通知
        DeviceEventEmitter.emit(EVENT.ADD_CUS_BOOK_EVENT, {});
        // 返回
        setTimeout(() => {
            this.props.navigation.goBack()
        }, 1000);
    }


    // 完成
    hasContentRight = ()=>{
        return (
            <TouchableOpacity 
                activeOpacity={0.9} 
                onPress={this._onComplete} 
                style={styles.confirmTouch}
            >
                <Text style={styles.confirm}>完成</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <BaseContainer 
                navigation={this.props.navigation} 
                title={'添加支出类别'}
                hasRight={true}
                hasContentRight={this.hasContentRight}
            >
                <ACHeader 
                    ref={'header'}
                    choose={this.state.choose} 
                    text={this.state.text} 
                    onChangeText={this._onChangeText}
                />
                <ACTable 
                    onPress={this._onPress} 
                    choose={this.state.choose}
                />
                <Toast 
                    ref="toast" 
                    position={"center"}
                    style={{backgroundColor: kColor_Text_Black}}
                    fadeInDuration={250}
                    fadeOutDuration={250}
                />
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    confirmTouch: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        paddingLeft: countcoordinatesX(30),
        paddingRight: countcoordinatesX(30),
    },
    confirm: {
        fontSize: FONT_SIZE(14),
        fontWeight: '400',
        color: kColor_Text_Black,
    },
});