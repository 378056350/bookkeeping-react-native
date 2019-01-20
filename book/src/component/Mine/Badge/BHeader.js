import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';


export default class BHeader extends Component {


    render() {
        return (
            <View style={styles.header}>
                <Text style={styles.name}>{title}</Text>
                <Text style={styles.detail}>{title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: countcoordinatesX(80),
        paddingLeft: countcoordinatesX(30),
        backgroundColor: 'white',
    },
    name: {
        fontSize: FONT_SIZE(14),
        fontWeight: '300',
        color: kColor_Text_Black,
    },
    detail: {
        fontSize: FONT_SIZE(12),
        fontWeight: '300',
        color: kColor_Text_Gray,
        marginLeft: countcoordinatesX(10),
    }
});