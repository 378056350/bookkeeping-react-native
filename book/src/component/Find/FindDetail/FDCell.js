import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';


export default class FDCell extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.name}>{this.props.model.month}月</Text>
                <Text style={styles.name}>{this.props.model.income.toFixed(2)}</Text>
                <Text style={styles.name}>{this.props.model.pay.toFixed(2)}</Text>
                <Text style={styles.name}>{this.props.model.data.toFixed(2)}</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: countcoordinatesX(80),
        paddingLeft: countcoordinatesX(40),
        paddingRight: countcoordinatesX(30),
        borderBottomColor: kColor_Line_Color,
        borderBottomWidth: countcoordinatesX(1),
    },
    name: {
        flex: 1,
        fontSize: FONT_SIZE(12),
        fontWeight: '300',
        fontFamily: 'Helvetica Neue',
        color: kColor_Text_Black,
    }

});