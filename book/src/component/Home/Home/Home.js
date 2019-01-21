import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import HomeNavigation from './HomeNavigation'
import HomeHeader from './HomeHeader'
import HomeTable from './HomeTable'

export default class Home extends Component {

    componentDidMount = () => {
        
    }
    

    render() {
        return (
            <View style={styles.container}>
                <HomeNavigation/>
                <HomeHeader/>
                <HomeTable/>
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