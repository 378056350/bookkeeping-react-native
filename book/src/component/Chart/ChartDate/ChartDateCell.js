import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';


export default class ChartDateCell extends Component {


    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.name, {color: this.props.choose == true ? kColor_Text_Black : kColor_Text_Gray}]}>
                    2018-53周
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: countcoordinatesX(200),
    },
    name: {
        fontSize: FONT_SIZE(14),
        fontWeight: '400',
        fontFamily: 'Helvetica Neue',
    }
});