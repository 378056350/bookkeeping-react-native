import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';


export default class ChartTableHeader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.name}>总支出: 0</Text>
                <Text style={styles.detail}>平均值: 0</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: countcoordinatesX(200),
        paddingLeft: countcoordinatesX(30),
        backgroundColor: 'orange',
    },
    name: {
        fontSize: FONT_SIZE(14),
        fontWeight: '400',
        color: kColor_Text_Black,
        marginTop: countcoordinatesX(10),
    },
    detail: {
        fontSize: FONT_SIZE(12),
        fontWeight: '400',
        color: kColor_Text_Black,
        marginTop: countcoordinatesX(5),
    }
});