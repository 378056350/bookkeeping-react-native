import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import CTSvg from '~/component/Chart/Table/CTSvg'


export default class ChartTableHeader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.name}>总支出: 0</Text>
                <Text style={styles.detail}>平均值: 0</Text>
                <CTSvg/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH - countcoordinatesX(60),
        marginLeft: countcoordinatesX(30),
        marginRight: countcoordinatesX(30),
    },
    name: {
        fontSize: FONT_SIZE(14),
        fontWeight: '300',
        color: kColor_Text_Black,
        marginTop: countcoordinatesX(20),
        fontFamily: 'Helvetica Neue',
    },
    detail: {
        fontSize: FONT_SIZE(12),
        fontWeight: '300',
        color: kColor_Text_Black,
        marginBottom: countcoordinatesX(20),
        fontFamily: 'Helvetica Neue',
    }
});