import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { ImageManager } from '~/assets/json/ImageManager'
const category_add = require('~/assets/image/category_add.png')
const category_delete = require('~/assets/image/category_delete.png')

export default class CCell extends PureComponent {
    
    render() {
        return (
            <View style={styles.container}>
                <Image source={this.props.section == 0 ? category_delete : category_add} resizeMode={'contain'} style={styles.icon}/>
                <Image source={ImageManager[this.props.model.icon_n]} resizeMode={'contain'} style={[styles.icon, {marginLeft: countcoordinatesX(20)}]}/>
                <Text style={styles.name}>{this.props.model.name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: countcoordinatesX(100),
        backgroundColor: 'white',
        paddingLeft: countcoordinatesX(30),
    },
    icon: {
        width: countcoordinatesX(50),
        height: countcoordinatesX(50),
    },
    name: {
        fontSize: FONT_SIZE(12),
        fontWeight: 'normal',
        color: kColor_Text_Gray,
        marginLeft: countcoordinatesX(20),
    }
});