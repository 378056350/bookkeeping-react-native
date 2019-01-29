import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';


export default class ChartDateCell extends Component {


    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} activeOpacity={1.0} style={styles.nameTouch}>
                <View style={styles.container}>
                    <Text style={[styles.name, {color: this.props.choose == true ? kColor_Text_Black : kColor_Text_Gray}]}>
                        {this.props.name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: countcoordinatesX(200),
    },
    nameTouch: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: FONT_SIZE(14),
        fontWeight: '400',
        fontFamily: 'Helvetica Neue',
    }
});