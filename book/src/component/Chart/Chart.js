import React, { Component } from 'react';
import {
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import ChartNavigation from '~/component/Chart/ChartNavigation'
import ChartSegmentedControl from '~/component/Chart/ChartSegmentedControl'
import ChartDate from '~/component/Chart/ChartDate/ChartDate'
import ChartTable from '~/component/Chart/Table/ChartTable'
import ChartHUD from '~/component/Chart/Hud/ChartHUD'


export default class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navigationIndex: 0,
            dateIndex: 0,
        }
    }

    _navigationPress = ()=>{
        this.refs.hud._switchAnimation()
    }
    
    // navigationIndex 改变
    _hudPress = (index)=>{
        this.setState({
            navigationIndex: index
        })
    }

    // dateIndex 改变
    _datePress = (index)=>{
        this.setState({
            dateIndex: index
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
                <ChartSegmentedControl/>
                <ChartDate 
                    dateIndex={this.state.dateIndex}
                    onPress={this._datePress} 
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