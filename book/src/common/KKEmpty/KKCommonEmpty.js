import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
const no_data = require('~/assets/image/no_data.png')

export default class KKCommonEmpty extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image source={no_data} resizeMode={'contain'} style={styles.icon}/>
                <Text style={styles.name}>暂无数据</Text>
            </View>
        );
    }
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT - NAVIGATION_HEIGHT - HOME_HEADER_H - STATUS_TABBAR_HEIGHT,
        backgroundColor: 'white'
    },
    icon: {
        width: SCREEN_WIDTH / 5,
        height: SCREEN_WIDTH / 5,
    },
    name: {
        fontSize: FONT_SIZE(12),
        fontWeight: '300',
        color: kColor_Text_Gray,

    }
    
});