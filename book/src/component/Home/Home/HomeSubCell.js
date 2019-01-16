import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
const default_header = require('~/assets/image/default_header.png')

export default class HomeSubCell extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.left}>
                    <Image source={default_header} resizeMode={'contain'} style={styles.icon}/>
                    <Text style={styles.name}>彩票</Text>
                </View>
                <Text style={styles.detail}>-555</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: countcoordinatesX(100),
        backgroundColor: 'white',
        paddingLeft: countcoordinatesX(30),
        paddingRight: countcoordinatesX(30),
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: countcoordinatesX(50),
        height: countcoordinatesX(50),
    },
    name: {
        fontSize: FONT_SIZE(12),
        fontWeight: '300',
        fontFamily: 'Helvetica Neue',
        color: kColor_Text_Black,
        paddingLeft: countcoordinatesX(10),
    },
    detail: {
        fontSize: FONT_SIZE(12),
        fontWeight: '300',
        color: kColor_Text_Black,
    }
});