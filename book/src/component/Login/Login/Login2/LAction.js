import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default class LAction extends Component {

    render() {
        return (
            <View style={styles.contentButton}>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.onPress(0)} style={styles.buttonTouch}>
                    <Text style={[styles.button, {paddingRight: countcoordinatesX(30)}]}>找回密码</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.props.onPress(1)} style={styles.buttonTouch}>
                    <Text style={[styles.button, {paddingLeft: countcoordinatesX(50)}]}>注册</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // 按钮控件
    contentButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    // 按钮
    buttonTouch: {
        justifyContent: 'center',
        alignItems: 'center',
        height: countcoordinatesX(100),
    },
    // 操作按钮
    button: {
        fontSize: FONT_SIZE(12),
        fontWeight: 'normal',
        color: kColor_Text_Gray,
    },
});