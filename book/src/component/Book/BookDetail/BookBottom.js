import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default class BookBottom extends Component {


    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onEditPress} activeOpacity={0.8} style={styles.nameTouch}>
                    <Text style={styles.name}>编辑</Text>
                </TouchableOpacity>
                <View style={styles.line}/>
                <TouchableOpacity onPress={this.props.onRemovePress} activeOpacity={0.8} style={styles.nameTouch}>
                    <Text style={styles.name}>删除</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: SCREEN_WIDTH,
        height: countcoordinatesX(100),
        marginBottom: SAFE_AREA_BOTTOM_HEIGHT,
        borderTopColor: kColor_Line_Color,
        borderTopWidth: countcoordinatesX(1),
    },
    nameTouch: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: FONT_SIZE(14),
        color: kColor_Text_Black,
    },
    line: {
        width: countcoordinatesX(1),
        height: countcoordinatesX(80),
        backgroundColor: kColor_Line_Color,
    }
});