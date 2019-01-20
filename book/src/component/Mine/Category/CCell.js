import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class CCell extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <Text>CCell</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: countcoordinatesX(100),
        backgroundColor: 'white',
        marginLeft: countcoordinatesX(30),
    }
});