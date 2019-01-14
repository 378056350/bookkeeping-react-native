import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

export default class ChartSegmentedControl extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>ChartSegmentedControl</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: countcoordinatesX(80),
        backgroundColor: kColor_Main_Color
    }
});