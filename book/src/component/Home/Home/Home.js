import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import HomeNavigation from './HomeNavigation'
import HomeHeader from './HomeHeader'
import HomeTable from './HomeTable'
import KKDatePicker from '~/common/KKDatePicker/KKDatePicker'

export default class Home extends Component {
    
    _onConfirm = (year, month, day)=>{
        
    }


    render() {
        return (
            <View style={styles.container}>
                <HomeNavigation/>
                <HomeHeader/>
                <HomeTable/>
                <KKDatePicker ref={'picker'} onConfirm={this._onConfirm}/>
            </View>
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