import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';

export default class BKField extends Component {

    // 初始化
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.name}>备注：</Text>
                <TextInput 
                    style={styles.input} 
                    maxLength={10} 
                    placeholder={'点击写备注'}
                    placeholderTextColor={kColor_Text_Gray}
                    iosspellCheck={false} 
                    selectionColor={kColor_Main_Color}
                    returnKeyType={'done'}
                />
                <Text style={styles.money}>0</Text>
            </View>
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
        borderBottomColor: kColor_Line_Color,
        borderBottomWidth: countcoordinatesX(2),
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