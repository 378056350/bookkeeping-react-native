import React, { Component } from 'react';
import {
	View,
	Text,
	Animated,
	TouchableOpacity,
	TouchableHighlight,
	StyleSheet,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';


export default class CTable extends Component {

	constructor(props) {
		super(props);
		this.state = {
			sectionListData: Array(5).fill('').map((_,i) => ({title: `title${i + 1}`, data: [...Array(5).fill('').map((_, j) => ({key: `${i}.${j}`, text: `item #${j}`}))]})),
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

	render() {
		return (
			<View style={styles.container}>
                <SwipeListView
                    useSectionList
                    sections={this.state.sectionListData}
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
                            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteSectionRow(rowMap, data.item.key) }>
                                <Text style={styles.backTextWhite}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    renderSectionHeader={({section}) => <Text>{section.title}</Text>}
                    rightOpenValue={-150}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onRowDidOpen={this.onRowDidOpen}
                    showsVerticalScrollIndicator={false}
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
	trash: {
		height: 25,
		width: 25,
	}
});
