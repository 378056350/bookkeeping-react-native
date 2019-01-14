import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';


export default class ChartTable extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>ChartTable</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        backgroundColor: 'blue'
    }
});