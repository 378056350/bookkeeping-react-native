import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import HomeNavigation from './HomeNavigation'
import HomeHeader from './HomeHeader'
import HomeTable from './HomeTable'
import KKDatePicker from '~/common/KKDatePicker/KKDatePicker'
import DeviceStorage from '~/utils/DeviceStorage'

export default class Home extends Component {
    
    _onConfirm = (year, month, day)=>{
        
    }

    componentDidMount = () => {
        DeviceStorage.initialization()
    }
    


    hasTitleComponent = ()=>{
        return (
            <HomeNavigation/>
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
                <HomeHeader/>
                <HomeTable/>
                <KKDatePicker ref={'picker'} onConfirm={this._onConfirm}/>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});