import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
const time_down = require('~/assets/image/time_down.png')
const chartX = countcoordinatesX(30)
const tagW = SCREEN_WIDTH / 2
const iconW = countcoordinatesX(40)
const iconH = iconW / 2


export default class CTTag extends Component {
    render() {
        const left = this.props.left - tagW / 2
        var contentL = 0
        contentL = left < -chartX ? -left - chartX : contentL
        contentL = (left + tagW + chartX) > SCREEN_WIDTH ? SCREEN_WIDTH - (left + tagW) : contentL
        return (
            <View style={[styles.container, {
                left: left,
                bottom: this.props.bottom
            }]}>
                <View style={[styles.content, {
                    left: contentL
                }]}>
                    <Text>asdasdasd</Text>
                </View>
                <View style={styles.bottom}>
                    {/* <Image source={time_down} resizeMethod={'scale'} style={[styles.icon, {left: tagW / 2 - iconW / 2}]}/>
                    <View style={[styles.line, {left: tagW / 2}]}/> */}
                    <Image source={time_down} resizeMethod={'scale'} style={[styles.icon]}/>
                    <View style={[styles.line]}/>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: tagW,
        // height: countcoordinatesX(200),
    },
    content: {
        backgroundColor: 'red',
        width: tagW,
        height: countcoordinatesX(100),
    },
    bottom: {
        width: tagW,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: iconW,
        height: iconH,
    },
    line: {
        width: countcoordinatesX(5),
        height: countcoordinatesX(100),
        backgroundColor: kColor_Text_Black,
    }
});