import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { ImageManager } from '~/assets/json/ImageManager'

export default class BookHeader extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image source={ImageManager[this.props.model.cmodel.icon_l]} style={styles.icon}/>
                <Text style={styles.name}>{this.props.model.cmodel.name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: countcoordinatesX(100),
        backgroundColor: kColor_Main_Color,
        paddingBottom: countcoordinatesX(20),
    },
    icon: {
        width: countcoordinatesX(110),
        height: countcoordinatesX(110),
    },
    name: {
        fontSize: FONT_SIZE(14),
        fontWeight: 'normal',
        color: kColor_Text_Black,
        marginTop: countcoordinatesX(20),
    }
});