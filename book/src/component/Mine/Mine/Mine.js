import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import MineTable from '~/component/Mine/Mine/MineTable'

export default class Mine extends Component {
    render() {
        return (
            <View style={styles.container}>
                <MineTable/>
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