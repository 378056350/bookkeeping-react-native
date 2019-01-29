import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { ImageManager } from '~/assets/json/ImageManager';

const lineW = (SCREEN_WIDTH - countcoordinatesX(30) - countcoordinatesX(60) - countcoordinatesX(20) - countcoordinatesX(30))
export default class CTHeaderCell extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={ImageManager[this.props.model.cmodel.icon_l]} resizeMode={'contain'} style={styles.icon}/>
                <View style={styles.contentRight}>
                    <View style={styles.contentTop}>
                        <Text style={styles.name}>{this.props.model.cmodel.name}</Text>
                        <Text style={styles.name}>{parseFloat(this.props.model.price)}</Text>
                    </View>
                    <View style={styles.contentBottom}>
                        <View style={[styles.line, {width: lineW / this.props.max * parseFloat(this.props.model.price)}]}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: countcoordinatesX(90),
        paddingLeft: countcoordinatesX(30),
        borderBottomColor: kColor_Line_Color,
        borderBottomWidth: countcoordinatesX(1),
    },
    icon: {
        width: countcoordinatesX(60),
        height: countcoordinatesX(60),
    },
    contentRight: {
        flex: 1,
        paddingTop: countcoordinatesX(15),
        paddingBottom: countcoordinatesX(15),
        paddingLeft: countcoordinatesX(20),
        paddingRight: countcoordinatesX(30),
    },
    contentTop: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contentBottom: {
        flex: 1,
        justifyContent: 'center',
    },
    line: {
        height: countcoordinatesX(6),
        borderTopLeftRadius: countcoordinatesX(3),
        borderTopRightRadius: countcoordinatesX(3),
        borderBottomLeftRadius: countcoordinatesX(3),
        borderBottomRightRadius: countcoordinatesX(3),
        backgroundColor: kColor_Main_Color,
    },
    name: {
        fontSize: FONT_SIZE(10),
        fontWeight: '400',
        color: kColor_Text_Black,
    }
});