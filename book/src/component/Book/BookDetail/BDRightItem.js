import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default class BDRightItemBar extends Component {
    
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress} activeOpacity={0.9}>
                <View style={styles.view}>
                    <Text style={styles.name}>分享</Text>
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
        fontSize: FONT_SIZE(14),
        fontWeight: '400',
        color: kColor_Text_Black,
    }
});