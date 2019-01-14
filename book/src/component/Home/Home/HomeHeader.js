import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';


export default class HomeHeader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>HomeHeader</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: countcoordinatesX(120),
        backgroundColor: 'red',
    }
});