import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';


export default class BFooter extends Component {


    render() {
        return (
            <View style={styles.container}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: countcoordinatesX(30),
        backgroundColor: kColor_BG,
    },
});