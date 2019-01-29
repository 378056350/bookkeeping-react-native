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
        var arr = await DeviceStorage.getChart(this.state.subdates[subdates.index], this.state.dateIndex)
        var max = 0
        var sum = 0
        var avg = 0
        for (var i=0; i<arr.length; i++) {
            var model = arr[i]
            sum += parseFloat(model.price)
            if (max < parseFloat(model.price)) {
                max = parseFloat(model.price)
            }
        }
        if (this.state.dateIndex == 0) {
            avg = sum / 7
        } else if (this.state.dateIndex == 1) {
            avg = sum / 30
        } else if (this.state.dateIndex == 2) {
            avg = sum / 12
        } 


        console.log("================== 111");
        
        var chart
        if (this.state.navigationIndex == 0) {
            chart = DateExtension.weekToStr(this.state.subdates[subdates.index])
        } else if (this.state.navigationIndex == 1) {
            chart = DateExtension.monthToStr(this.state.subdates[subdates.index])
        } else if (this.state.navigationIndex == 2) {
            chart = DateExtension.yearToStr(this.state.subdates[subdates.index])
        } 

        this.refs.table.setModel([{ 
            title: "title", 
            max: max, 
            sum: sum, 
            avg: avg,
            chart: chart,
            data: arr 
        }])
    }

    changeData = async ()=>{
        // 滚动
        this.refs.date._onPress(this.state.subdateIndex)
        // 列表数据
        var arr = await DeviceStorage.getChart(this.state.subdates[this.state.subdateIndex], this.state.dateIndex)
        var max = 0
        var sum = 0
        var avg = 0
        for (var i=0; i<arr.length; i++) {
            var model = arr[i]
            sum += parseFloat(model.price)
            if (max < parseFloat(model.price)) {
                max = parseFloat(model.price)
            }
        }
        if (this.state.dateIndex == 0) {
            avg = sum / 7
        } else if (this.state.dateIndex == 1) {
            avg = sum / 30
        } else if (this.state.dateIndex == 2) {
            avg = sum / 12
        } 
        this.refs.table.setModel([{ title: "title", max: max, sum: sum, avg: avg, data: arr }])
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
        }, 0);
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