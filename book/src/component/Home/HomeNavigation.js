import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
const navIcon = require('~/assets/image/share_shark_99x27_.png')


export default class HomeNavigation extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.icon} source={navIcon} resizeMode={'contain'}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: NAVIGATION_HEIGHT,
        backgroundColor: kColor_Main_Color,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: STATUS_BAR_HEIGHT,
    },
    icon: {
        height: 20,
    }
});