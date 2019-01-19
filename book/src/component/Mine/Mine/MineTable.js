import React, { Component } from 'react';
import {
    View,
    SectionList,
    StyleSheet
} from 'react-native';
import MineHeader from '~/component/Mine/Mine/MineHeader'
import MineCell from '~/component/Mine/Mine/MineCell'
const mine_badge = require('~/assets/image/mine_badge.png')
const mine_tallytype = require('~/assets/image/mine_tallytype.png')
const mine_sound = require('~/assets/image/mine_sound.png')
const mine_remind = require('~/assets/image/mine_remind.png')
const mine_detail = require('~/assets/image/mine_detail.png')
const mine_rating = require('~/assets/image/mine_rating.png')
const mine_feedback = require('~/assets/image/mine_feedback.png')
const mine_merge = require('~/assets/image/mine_merge.png')
const mine_help = require('~/assets/image/mine_help.png')
const mine_about = require('~/assets/image/mine_about.png')


export default class MineTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { data: [{"icon": mine_badge, "name": "徽章", row: 0, section: 0, detail: '123'}]},
                { data: [
                    {"icon": mine_tallytype, "name": "类别设置", row: 0, section: 1}, 
                    {"icon": mine_remind, "name": "定时提醒", row: 1, section: 1}, 
                    {"icon": mine_sound, "name": "声音开关", row: 2, section: 1, isSwitch: true}, 
                    {"icon": mine_detail, "name": "明细详情", row: 3, section: 1, isSwitch: true}
                ]},
                { data: [
                    {"icon": mine_rating, "name": "去App Store给鲨鱼记账评分", row: 0, section: 2}, 
                    {"icon": mine_feedback, "name": "意见反馈", row: 1, section: 2}, 
                    {"icon": mine_merge, "name": "同步数据", row: 2, section: 2}, 
                    {"icon": mine_help, "name": "帮助", row: 3, section: 2}, 
                    {"icon": mine_about, "name": "关于鲨鱼记账", row: 4, section: 2}
                ]},
            ]
        }
    }

    
    // Table Header
    _header = ()=>{
        return (
           <MineHeader onInfoPress={this.props.onInfoPress}/>
        )
    }
    // Table Footer
    _footer = ()=>{
        return (
            <View style={{height: countcoordinatesX(100)}}/>
        )
    }
    // Table Section Header
    _renderSectionHeader = ()=>{
        return (
            <View style={styles.header}>

            </View>
        )
    }
    // Cell
    _renderItem = (item, index, section)=>{
        return (
            <MineCell 
                data={item} 
                isSwitch={item.isSwitch}
                onPress={()=>this.props.onItemPress(item, index, section)}
            />
        )
    }
    // 分割线
    _itemSeparatorComponent = ()=>{
        return (
            <View style={styles.line}/>
        )
    }
    // 初始化
    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    style={styles.table}
                    renderItem={({ item, index, section }) => this._renderItem(item, index, section)}
                    renderSectionHeader={this._renderSectionHeader}
                    sections={this.state.data}
                    ListHeaderComponent={this._header}
                    ListFooterComponent={this._footer}
                    ItemSeparatorComponent={this._itemSeparatorComponent}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => item + index}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    table: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT - STATUS_TABBAR_HEIGHT,
        backgroundColor: kColor_BG,
    },
    header: {
        width: SCREEN_WIDTH,
        height: countcoordinatesX(20),
    },
    item: {
        width: SCREEN_WIDTH,
        height: countcoordinatesX(80),
        backgroundColor: 'white'
    },
    line: {
        width: SCREEN_WIDTH,
        height: countcoordinatesX(1),
        color: kColor_BG,
    },
});