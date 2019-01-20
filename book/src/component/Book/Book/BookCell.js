import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default class BookCell extends Component {

    render() {
        return (
            <TouchableOpacity activeOpacity={0.9} style={styles.container}>
                <View style={styles.view}>
                    <Image resizeMode={'contain'} style={styles.icon}/>
                    <Text style={styles.name}>BookCell</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: (SCREEN_WIDTH - countcoordinatesX(60)) / 4,
        height: 100,
        backgroundColor: 'red',
    },
    view: {
        flex: 1,
        alignItems: 'center',
    },
    icon: {
        width: (SCREEN_WIDTH - countcoordinatesX(60)) / 4,
        height: (SCREEN_WIDTH - countcoordinatesX(60)) / 4,
        backgroundColor: 'orange',
    },
    name: {
        fontSize: FONT_SIZE(14),
        fontWeight: '400',
        color: kColor_Text_Black,
        marginTop: countcoordinatesX(10),
    }
    
});