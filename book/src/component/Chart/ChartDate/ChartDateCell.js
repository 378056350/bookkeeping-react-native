import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';


export default class ChartDateCell extends Component {


    
    render() {
        return (
            <View style={styles.container}>
                <Text>ChartDateCellChartDateCellChartDateCell</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        paddingRight: countcoordinatesX(20),
    }
});