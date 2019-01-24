import React, { Component } from 'react';
import {
    View,
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
            navigationIndex: 0
        }
    }

    _navigationPress = ()=>{
        // this.setState({navigationIndex: this.state.navigationIndex == 0 ? 1 : 0})
        this.refs.hud._switchAnimation()
    }
    _hudPress = (index)=>{
        this.setState({
            navigationIndex: index
        })
    }

    hasTitleComponent = ()=>{
        return (
            <ChartNavigation onPress={this._navigationPress} navigationIndex={this.state.navigationIndex}/>
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
                <ChartDate/>
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
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});