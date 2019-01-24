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
            <Image style={styles.icon} source={navIcon} resizeMode={'contain'}/>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        height: 20,
    }
});