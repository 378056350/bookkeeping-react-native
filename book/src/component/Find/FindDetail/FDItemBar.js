import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
const time_down = require('~/assets/image/time_down.png')

export default class FDItemBar extends Component {
    
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress} activeOpacity={0.9}>
                <View style={styles.view}>
                    <Text style={styles.name}>{this.props.year}</Text>
                    <Image source={time_down} resizeMode={'contain'} style={styles.icon}/>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginRight: countcoordinatesX(20),
    },
    view: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: FONT_SIZE(16),
        fontWeight: '400',
        color: kColor_Text_Black,
    },
    icon: {
        width: countcoordinatesX(30),
        height: countcoordinatesX(30),
        marginLeft: countcoordinatesX(5),
    }
});