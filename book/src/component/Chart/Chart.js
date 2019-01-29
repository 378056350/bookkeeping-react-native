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

export default class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navigationIndex: 0,
            dateIndex: 0,
            subdateIndex: 0,
            subdates: []
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
        var subdates = await DeviceStorage.getChartDateRange(this.state.navigationIndex, this.state.dateIndex)
        this.setState({
            subdates: subdates.arr
        })
        setTimeout(() => {
            // 滚动
            this.refs.date._onPress(subdates.index)
            // 请求
            
        }, 0);
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
                    dateIndex={this.state.subdateIndex}
                    onPress={this._subdatePress} 
                    dates={this.state.subdates}
                />
                <ChartTable/>
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