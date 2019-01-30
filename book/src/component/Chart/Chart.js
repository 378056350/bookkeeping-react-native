import React, { Component } from 'react';
import {
    DeviceEventEmitter,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import ChartNavigation from '~/component/Chart/ChartNavigation'
import ChartSegmentedControl from '~/component/Chart/ChartSegmentedControl'
import ChartDate from '~/component/Chart/ChartDate/ChartDate'
import ChartTable from '~/component/Chart/Table/ChartTable'
import ChartHUD from '~/component/Chart/Hud/ChartHUD'
import DeviceStorage from '~/utils/DeviceStorage'
import DateExtension from '~/utils/DateExtension'


export default class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navigationIndex: 0,
            dateIndex: 0,
            subdateIndex: 0,
            subdates: [],
            listdatas: []
        }
    }

    componentDidMount = () => {
        DeviceEventEmitter.addListener(EVENT.ADD_BOOK_EVENT, this.getData);
        DeviceEventEmitter.addListener(EVENT.REMOVE_BOOK_EVENT, this.getData);
        DeviceEventEmitter.addListener(EVENT.REPLACE_BOOK_EVENT, this.getData);
        this.getData()
    }

    componentWillUnmount = () => {
        DeviceEventEmitter.removeListener(EVENT.ADD_BOOK_EVENT, this.getData)
        DeviceEventEmitter.removeListener(EVENT.REMOVE_BOOK_EVENT, this.getData)
        DeviceEventEmitter.removeListener(EVENT.REPLACE_BOOK_EVENT, this.getData)
    }
    
    getData = async ()=>{
        // 时间范围
        var subdates = await DeviceStorage.getChartDateRange(this.state.navigationIndex, this.state.dateIndex)
        this.setState({
            subdates: subdates.arr,
            subdateIndex: subdates.index,
        })
        // 滚动
        this.refs.date._onPress(subdates.index)
        // 列表数据
        var data = await DeviceStorage.getChart(this.state.subdates[subdates.index], this.state.navigationIndex, this.state.dateIndex)
        this.refs.table.setModel(data)
    }

    changeData = async ()=>{
        // 滚动
        this.refs.date._onPress(this.state.subdateIndex)
        // 列表数据
        var data = await DeviceStorage.getChart(this.state.subdates[this.state.subdateIndex], this.state.navigationIndex, this.state.dateIndex)
        this.refs.table.setModel(data)
    }

    _navigationPress = ()=>{
        this.refs.hud._switchAnimation()
    }
    
    // navigationIndex 改变
    _hudPress = (index)=>{
        this.setState({
            navigationIndex: index
        })
        setTimeout(() => {
            this.getData() 
        }, 1000);
    }

    // dateIndex 改变
    _controlPress = (index)=>{
        this.setState({
            dateIndex: index
        })
        setTimeout(() => {
            this.getData() 
        }, 0);
    }

    // subdateIndex 改变
    _subdatePress = (index)=>{
        this.setState({
            subdateIndex: index
        })
        setTimeout(() => {
            this.changeData() 
        }, 0);
    }

    // 点击cell
    _onCellPress = (item)=>{
        this.props.navigation.navigate('BookDetail', {'model': item})
    }

    
    hasTitleComponent = ()=>{
        return (
            <ChartNavigation 
                navigationIndex={this.state.navigationIndex}
                onPress={this._navigationPress} 
            />
        )
    }

    render() {
        return (
            <BaseContainer 
                navigation={this.props.navigation} 
                hasLeft={true}
                hasTitle={false} 
                hasTitleComponent={this.hasTitleComponent}
            >
                <ChartSegmentedControl 
                    onPress={this._controlPress}
                    dateIndex={this.state.dateIndex}
                />
                <ChartDate 
                    ref={'date'}
                    subdateIndex={this.state.subdateIndex}
                    onPress={this._subdatePress} 
                    dates={this.state.subdates}
                />
                <ChartTable 
                    ref={'table'} 
                    dateIndex={this.state.dateIndex}
                    subdateIndex={this.state.subdateIndex}
                    navigationIndex={this.state.navigationIndex}
                    onPress={this._onCellPress}
                />
                <ChartHUD 
                    ref={'hud'} 
                    navigationIndex={this.state.navigationIndex}
                    onPress={this._hudPress}
                />
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    
});