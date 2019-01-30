import React, { Component } from 'react';
import {
    View,
    Animated,
    Text,
    StyleSheet
} from 'react-native';
import HomeSubHeader from '~/component/Home/Home/SubTable/HomeSubHeader'
import HomeSubCell from '~/component/Home/Home/SubTable/HomeSubCell'
import HomeActionItem from '~/component/Home/Home/SubTable/HomeActionItem'
import KKCommonEmpty from '~/common/KKEmpty/KKCommonEmpty'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';


export default class HomeSubTable extends Component {

	closeRow(rowMap, rowKey) {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	}

	// 关闭
	_closeRow(rowMap, rowKey) {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
    }
    
	_actionRow(rowMap, rowKey) {
		this._closeRow(rowMap, rowKey);
		this.props.actionRow(rowKey)
	}

	onRowDidOpen = (rowKey, rowMap) => {
        
	}
    
    _renderItem = ({item, index, section})=>{
        return (
            <HomeSubCell model={item} onPress={()=>this.props.onPress(item, index, section)}/>
        )
    }

    _renderSectionHeader = (section)=>{
        return (
            <HomeSubHeader model={section.section}/>
        )
    }

    // 操作
	_renderHiddenItem = (data, rowMap)=>{
		return (
			<HomeActionItem 
				section={parseInt(data.item.key.split('.')[0])}
				onClosePress={()=>{
					this._closeRow(rowMap, data.item.key)
				}} 
				onActionPress={()=>{
					this._actionRow(rowMap, data.item.key)
				}}
			/>
		)
    }

    // 线条
    _ItemSeparatorComponent = ()=>{
        return (
            <View style={styles.line}/>
        )
    }

    // 空白页
    _ListEmptyComponent = ()=>{
        return (
            <KKCommonEmpty/>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <SwipeListView
                    style={{width: SCREEN_WIDTH}}
                    useSectionList
                    sections={this.props.models}
                    renderItem={this._renderItem}
                    renderHiddenItem={this._renderHiddenItem}
                    renderSectionHeader={this._renderSectionHeader}
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                    ListEmptyComponent={this._ListEmptyComponent}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    rightOpenValue={-75}
                    onRowDidOpen={this.onRowDidOpen}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    line: {
		width: SCREEN_WIDTH,
        height: countcoordinatesX(1),
        backgroundColor: kColor_Line_Color,
    }
});