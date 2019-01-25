import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	Animated,
	TouchableHighlight,
	StyleSheet,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import CSectionHeader from './CSectionHeader'
import CActionItem from './CActionItem'
import CCell from './CCell'


export default class CTable extends Component {

	constructor(props) {
		super(props);
		this.state = {
			sectionListData: []
			// sectionListData: []
			// sectionListData: [
			// 	{'title': 'asd', 'data': [
			// 		{'key': '123', 'text': '123'},{'key': '123', 'text': '123'},{'key': '123', 'text': '123'},
			// 		{'key': '123', 'text': '123'},{'key': '123', 'text': '123'},{'key': '123', 'text': '123'},
			// 		{'key': '123', 'text': '123'},{'key': '123', 'text': '123'},{'key': '123', 'text': '123'}
			// 	]},
			// 	{'title': 'asd', 'data': [{'key': '123', 'text': '123'},{'key': '123', 'text': '123'},{'key': '123', 'text': '123'}]}
			// ]
			// sectionListData: Array(5).fill('').map((_,i) => ({title: `title${i + 1}`, data: [...Array(5).fill('').map((_, j) => ({key: `${i}.${j}`, text: `item #${j}`}))]})),
		};

		this.rowSwipeAnimatedValues = {};
		Array(20).fill('').forEach((_, i) => {
			this.rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
		});
	}

	closeRow(rowMap, rowKey) {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
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








	// 操作
	renderHiddenItem = (data, rowMap)=>{
		return (
			<CActionItem onClosePress={()=>{
			  	this.closeRow(rowMap, data.item.key)
			}} onDeletePress={()=>{
				console.log("123456");
				this.deleteSectionRow(rowMap, data.item.key)
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
                    useSectionList
                    sections={this.props.models}
                    renderItem={this.renderItem}
                    renderHiddenItem={this.renderHiddenItem}
					ItemSeparatorComponent={this.ItemSeparatorComponent}
					renderSectionHeader={this.renderSectionHeader}
                    rightOpenValue={-150}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
					onRowDidOpen={this.onRowDidOpen}
					onSwipeValueChange={this.onSwipeValueChange}
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
    models: [],
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: kColor_BG,
		flex: 1
	},
	backTextWhite: {
		color: '#FFF'
	},
	rowFront: {
		alignItems: 'center',
		backgroundColor: '#CCC',
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		justifyContent: 'center',
		height: 50,
	},
	trash: {
		height: 25,
		width: 25,
	},
	line: {
		width: SCREEN_WIDTH,
		height: countcoordinatesX(1),
		backgroundColor: kColor_Line_Color,
	}
});
