import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class BookCell extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.name}>{this.props.name}</Text>
                <Text style={styles.detail}>{this.props.detail}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: countcoordinatesX(100),
    },
    name: {
        fontSize: FONT_SIZE(12),
        fontWeight: 'normal',
        color: kColor_Text_Gray,
        marginLeft: countcoordinatesX(30),
    },
    detail: {
        fontSize: FONT_SIZE(12),
        fontWeight: 'normal',
        color: kColor_Text_Black,
        marginLeft: countcoordinatesX(30),
    }
});