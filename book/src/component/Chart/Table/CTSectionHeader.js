import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';


export default class CTSectionHeader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.name}>{this.props.navigationIndex == 0 ? '支出排行榜' : '收入排行榜'}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        paddingLeft: countcoordinatesX(30),
        paddingTop: countcoordinatesX(20),
        paddingBottom: countcoordinatesX(20),
    },
    name: {
        fontSize: FONT_SIZE(14),
        fontWeight: '400',
        fontFamily: 'Helvetica Neue',
        color: kColor_Text_Black,
    }
});