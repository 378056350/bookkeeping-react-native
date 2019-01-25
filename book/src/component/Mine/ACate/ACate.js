import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import ACateGlobal from './ACateGlobal'
import ACHeader from './ACHeader'
import ACTable from './ACTable'
import Toast, {DURATION} from 'react-native-easy-toast'
import DeviceStorage, {SAVE} from '~/utils/DeviceStorage'
import { BKCModel } from '~/services/Interfaces'
const ACA = require('~/assets/json/ACA.json')


export default class ACate extends Component {
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
        this.refs.header.blur()
        const text = this.state.text
        const model = ACA[this.state.choose.section].list[this.state.choose.row]
        const is_income = this.props.navigation.state.params.isIncome
        if (text.length == 0) {
            this.refs.toast.show('类别名称不能为空', 500)
            return 
        }
        this.refs.toast.show('添加中', DURATION.FOREVER)

        var cateSysHasPayArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_HAS_PAY)
        var cateSysRemovePayArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_REMOVE_PAY)
        var cateCusHasPayArr = await DeviceStorage.load(SAVE.PIN_CATE_CUS_HAS_PAY)
        var cateCusHasPaySyncedArr = await DeviceStorage.load(SAVE.PIN_CATE_CUS_HAS_PAY_SYNCED)

        var cateSysHasIncomeArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_HAS_INCOME)
        var cateSysRemoveIncomeArr = await DeviceStorage.load(SAVE.PIN_CATE_SYS_REMOVE_INCOME)
        var cateCusHasIncomeArr = await DeviceStorage.load(SAVE.PIN_CATE_CUS_HAS_INCOME)
        var cateCusHasIncomeSyncedArr = await DeviceStorage.load(SAVE.PIN_CATE_CUS_HAS_INCOME_SYNCED)
        
        var newmodel = {
            "id": cateSysHasPayArr.count + cateSysRemovePayArr.count + cateCusHasPayArr.count + cateSysHasIncomeArr.count + cateSysRemoveIncomeArr.count + cateCusHasIncomeArr.count,
            "name": text,
            "icon_n": model.icon_n,
            "icon_l": model.icon_l,
            "icon_s": model.icon_s,
            "is_income": is_income,
            "is_system": 0,
        }
        
        // 支出
        if (is_income == false) {
            BKCModel.addObject(cateCusHasPayArr, newmodel)
            await DeviceStorage.save(SAVE.PIN_CATE_CUS_HAS_PAY, cateCusHasPayArr)

            BKCModel.addObject(cateCusHasPaySyncedArr, newmodel)
            await DeviceStorage.save(SAVE.PIN_CATE_CUS_HAS_PAY_SYNCED, cateCusHasPaySyncedArr)
        }
        // 收入
        else {
            BKCModel.addObject(cateCusHasIncomeArr, newmodel)
            await DeviceStorage.save(SAVE.PIN_CATE_CUS_HAS_INCOME, cateCusHasIncomeArr)

            BKCModel.addObject(cateCusHasIncomeSyncedArr, newmodel)
            await DeviceStorage.save(SAVE.PIN_CATE_CUS_HAS_INCOME_SYNCED, cateCusHasIncomeSyncedArr)
        }

        setTimeout(() => {
            this.props.navigation.goBack()
        }, 2000);
        
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