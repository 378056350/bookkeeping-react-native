import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';


export default class KDHeader extends Component {
   

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onCancle} activeOpacity={0.8} style={styles.buttonTouch}>
                    <Text style={styles.button}>取消</Text>
                </TouchableOpacity>
                <Text style={styles.title}>选择日期</Text>
                <TouchableOpacity onPress={this.props.onConfirm} activeOpacity={0.8} style={styles.buttonTouch}>
                    <Text style={styles.button}>确定</Text>
                </TouchableOpacity>
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
        borderBottomColor: kColor_Line_Color,
        borderBottomWidth: countcoordinatesX(2),
    },
    buttonTouch: {
        justifyContent: 'center',
        alignItems: 'center',
        height: countcoordinatesX(100),
    },
    button: {
        fontSize: FONT_SIZE(14),
        fontWeight: '400',
        color: kColor_Text_Black,
        paddingLeft: countcoordinatesX(40),
        paddingRight: countcoordinatesX(40),
    },
    title: {
        fontSize: FONT_SIZE(14),
        fontWeight: '300',
        color: kColor_Text_Black,
    }
    
});