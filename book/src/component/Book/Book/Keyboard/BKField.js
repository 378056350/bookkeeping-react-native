import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Animated,
    StyleSheet
} from 'react-native';

export default class BKField extends Component {

    // 初始化
    render() {
        return (
            <Animated.View style={[styles.container, {...this.props.style}]}>
                <Text style={styles.name}>备注：</Text>
                <TextInput 
                    style={styles.input} 
                    maxLength={20} 
                    placeholder={'点击写备注'}
                    placeholderTextColor={kColor_Text_Gray}
                    iosspellCheck={false} 
                    contextMenuHidden={true}
                    selectionColor={kColor_Main_Color}
                    returnKeyType={'done'}
                />
                <Text style={styles.money}>{this.props.money}</Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: SCREEN_WIDTH,
        height: (SCREEN_HEIGHT - NAVIGATION_HEIGHT) / 2 / 5,
        alignItems: 'center',
        paddingLeft: countcoordinatesX(30),
        backgroundColor: 'white',
        position: 'relative',
        borderBottomColor: kColor_Line_Color,
        borderBottomWidth: countcoordinatesX(2),
        shadowOffset: {width: 0, height: -2},
        shadowColor: kColor_Text_Gray,
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    name: {
        fontSize: FONT_SIZE(14),
        fontWeight: '300',
        color: kColor_Text_Black,
    },
    input: {
        flex: 1,
        height: countcoordinatesX(120),
        fontSize: FONT_SIZE(14),
        fontFamily: 'Helvetica Neue',
        fontWeight: '300',
        color: kColor_Text_Black,
    },
    money: {
        fontSize: FONT_SIZE(22),
        fontWeight: '400',
        color: kColor_Text_Black,
        paddingLeft: countcoordinatesX(30),
        paddingRight: countcoordinatesX(30),
    }
});