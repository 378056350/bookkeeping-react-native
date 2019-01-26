import React, { Component } from 'react';
import {
    View,
    DeviceEventEmitter,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import HomeNavigation from './HomeNavigation'
import HomeHeader from './HomeHeader'
import HomeTable from './HomeTable'
import KKDatePicker from '~/common/KKDatePicker/KKDatePicker'
import DeviceStorage from '~/utils/DeviceStorage'


export default class Home extends Component {

    componentDidMount = () => {
        DeviceStorage.initialization()
        DeviceEventEmitter.addListener(EVENT.ADD_BOOK_EVENT, this.getData);
        this.getData()
    }

    componentWillUnmount = () => {
        DeviceEventEmitter.removeListener(EVENT.ADD_BOOK_EVENT, this.getData)
    }

    getData = ()=>{
        
    }

    _onConfirm = (year, month, day)=>{
        
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
    
});