import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
const cate_add = require('~/assets/image/cate_add.png')

export default class TButton extends Component {
    
    render() {
        return (
            <TouchableHighlight onPress={()=>{}} underlayColor={kColor_Line_Color}>
                <View style={styles.container}>
                    <Image source={cate_add} style={styles.icon}/>
                    <Text style={styles.name}>添加提醒</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: countcoordinatesX(120),
        backgroundColor: 'white',
        borderTopColor: kColor_Line_Color,
        shadowOffset: {width: 0, height: -2},
        shadowColor: kColor_Line_Color,
        shadowOpacity: 0.5,
        shadowRadius: 2,
        paddingBottom: SAFE_AREA_BOTTOM_HEIGHT,
    },
    icon: {
        width: countcoordinatesX(30),
        height: countcoordinatesX(30),
    },
    name: {
        fontSize: FONT_SIZE(14),
        fontWeight: '400',
        color: kColor_Text_Black,
        marginLeft: countcoordinatesX(10),
    },
});