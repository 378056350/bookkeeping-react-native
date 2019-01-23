import React, { Component } from 'react';
import {
    View,
    Image,
    TextInput,
    StyleSheet
} from 'react-native';
const ACA = require('~/assets/json/ACA.json')
import { ACAImage } from '~/assets/json/ACAImage'


export default class ACHeader extends Component {
    render() {
        const choose = this.props.choose
        return (
            <View style={styles.container}>
                <Image source={ACAImage[ACA[choose.section].list[choose.row].icon_s]} style={styles.icon}/>
                <TextInput 
                    style={styles.input}
                    placeholder={'请输入类别名称(不超过4个汉字)'}
                    selectionColor={kColor_Main_Color}
                    placeholderTextColor={kColor_Text_Gray}
                    maxLength={4}
                    contextMenuHidden={true}
                    returnKeyType={'done'}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: countcoordinatesX(140),
        paddingLeft: countcoordinatesX(40),
        borderBottomColor: kColor_Line_Color,
        borderBottomWidth: countcoordinatesX(2),
    },
    icon: {
        width: ACATE_IMAGE_W,
        height: ACATE_IMAGE_W,
    },
    input: {
        flex: 1,
        marginLeft: countcoordinatesX(20),
        marginRight: countcoordinatesX(20),
        height: countcoordinatesX(120),
        fontSize: FONT_SIZE(14),
        color: kColor_Text_Black,
    }
});