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

    constructor(props) {
		super(props);
		this.state = {
			// listViewData: Array(20).fill('').map((_,i) => ({key: `${i}`, text: `item #${i}`})),
			// sectionListData: Array(5).fill('').map((_,i) => ({title: `title${i + 1}`, data: [...Array(5).fill('').map((_, j) => ({key: `${i}.${j}`, text: `item #${j}`}))]})),
		};

		// this.rowSwipeAnimatedValues = {};
		// Array(20).fill('').forEach((_, i) => {
		// 	this.rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
		// });
	}

	closeRow(rowMap, rowKey) {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	}

	deleteRow(rowMap, rowKey) {
		this.closeRow(rowMap, rowKey);
		const newData = [...this.state.listViewData];
		const prevIndex = this.state.listViewData.findIndex(item => item.key === rowKey);
		newData.splice(prevIndex, 1);
		this.setState({listViewData: newData});
	}

	deleteSectionRow(rowMap, rowKey) {
		this.closeRow(rowMap, rowKey);
		var [section, row] = rowKey.split('.');
		const newData = [...this.state.sectionListData];
		const prevIndex = this.state.sectionListData[section].data.findIndex(item => item.key === rowKey);
		newData[section].data.splice(prevIndex, 1);
		this.setState({sectionListData: newData});
	}

	onRowDidOpen = (rowKey, rowMap) => {
		console.log('This row opened', rowKey);
	}

	onSwipeValueChange = (swipeData) => {
		const { key, value } = swipeData;
		this.rowSwipeAnimatedValues[key].setValue(Math.abs(value));
    }
    
    _renderItem = ({item, index, section})=>{
        return (
            <HomeSubCell model={item}/>
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
            <SwipeListView
                useSectionList
                style={styles.list}
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
        )
    }
}

const styles = StyleSheet.create({
    list: {
        
    },
    line: {
        height: countcoordinatesX(1),
        backgroundColor: kColor_Line_Color,
    }
});