import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	StyleSheet,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import CSectionHeader from './CSectionHeader'
import CActionItem from './CActionItem'
import CCell from './CCell'


export default class CTable extends Component {


	// 关闭
	_closeRow(rowMap, rowKey) {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	}

	// 删除
	_deleteSectionRow(rowMap, rowKey) {
		// this._closeRow(rowMap, rowKey);
		// var [section, row] = rowKey.split('.');
		// const newData = [...this.state.sectionListData];
		// const prevIndex = this.state.sectionListData[section].data.findIndex(item => item.key === rowKey);
		// newData[section].data.splice(prevIndex, 1);
		// this.setState({sectionListData: newData});
	}

	// 某行开始操作
	_onRowDidOpen = (rowKey, rowMap) => {
		// console.log('This row opened', rowKey);
	}




	// 操作
	renderHiddenItem = (data, rowMap)=>{
		return (
			<CActionItem onClosePress={()=>{
			  	this._closeRow(rowMap, data.item.key)
			}} onDeletePress={()=>{
				this._deleteSectionRow(rowMap, data.item.key)
			}}/>
		)
	}

	// 间隔线
	ItemSeparatorComponent = ()=>{
		return (
			<View style={styles.line}/>
		)
	}

	// 头视图
	renderSectionHeader = (section)=>{
		return (
			<CSectionHeader section={section.title}/>
		)
	}

	// Cell
	renderItem = (data, rowMap)=>{
		return (
			<CCell model={data.item} section={data.section.title}/>
		)
	}

	render() {
		return (
			<View style={styles.container}>
                <SwipeListView
					ref={'list'}
                    useSectionList
                    sections={this.props.models[this.props.handleIndexChange]}
                    renderItem={this.renderItem}
                    renderHiddenItem={this.renderHiddenItem}
					ItemSeparatorComponent={this.ItemSeparatorComponent}
					renderSectionHeader={this.renderSectionHeader}
                    rightOpenValue={-75}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
					onRowDidOpen={this._onRowDidOpen}
					stickySectionHeadersEnabled={false}
                    showsVerticalScrollIndicator={false}
                />
			</View>
		);
	}
}


CTable.propTypes = {
    models: PropTypes.array,
}
CTable.defaultProps = {
    models: [[], []],
}


const styles = StyleSheet.create({
	container: {
		backgroundColor: kColor_BG,
		flex: 1
	},
	line: {
		width: SCREEN_WIDTH,
		height: countcoordinatesX(1),
		backgroundColor: kColor_Line_Color,
	},
})
