import React, {
	Component,
} from 'react';
import {
	View,
	Text,
	Image,
	Animated,
	Dimensions,
	TouchableOpacity,
	TouchableHighlight,
	StyleSheet,
} from 'react-native';

import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

export default class TTable extends Component {

	constructor(props) {
		super(props);
		this.state = {
			listViewData: Array(20).fill('').map((_,i) => ({key: `${i}`, text: `item #${i}`})),
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

	render() {
		return (
			<View style={styles.container}>
				<SwipeListView
					useFlatList
					data={this.state.listViewData}
					renderItem={ (data, rowMap) => (
						<TouchableHighlight
							onPress={ _ => console.log('You touched me') }
							style={styles.rowFront}
							underlayColor={'#AAA'}
						>
							<View>
								<Text>I am {data.item.text} in a SwipeListView</Text>
							</View>
						</TouchableHighlight>
					)}
					renderHiddenItem={ (data, rowMap) => (
						<View style={styles.rowBack}>
							<Text>Left</Text>
							<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => this.closeRow(rowMap, data.item.key) }>
								<Text style={styles.backTextWhite}>Close</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(rowMap, data.item.key) }>
								<Animated.View
									style={[
										styles.trash,
										{

											transform: [
												{
													scale: this.rowSwipeAnimatedValues[data.item.key].interpolate({
														inputRange: [45, 90],
														outputRange: [0, 1],
														extrapolate: 'clamp',
													}),
												}
											],
										}
									]}
								>
									<Image style={styles.trash} />
								</Animated.View>
							</TouchableOpacity>
						</View>
					)}
					leftOpenValue={75}
					rightOpenValue={-150}
					previewRowKey={'0'}
					previewOpenValue={-40}
					previewOpenDelay={3000}
					onRowDidOpen={this.onRowDidOpen}
					onSwipeValueChange={this.onSwipeValueChange}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
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
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0
	},
	switch: {
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'black',
		paddingVertical: 10,
		width: Dimensions.get('window').width / 4,
	},
	trash: {
		height: 25,
		width: 25,
	}
});

