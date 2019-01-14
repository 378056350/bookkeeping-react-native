import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import FindTable from '~/component/Find/FindTable'

export default class Find extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FindTable/>
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