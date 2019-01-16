import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

export default class HomeSubHeader extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.contentLeft}>
                    <Text style={styles.name}>01月13日</Text>
                    <Text style={[styles.name,  {marginLeft: countcoordinatesX(20)}]}>星期六</Text>
                </View>
                <Text style={styles.name}>支出: 999</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: countcoordinatesX(60),
        // backgroundColor: 'red',
        paddingLeft: countcoordinatesX(30),
        paddingRight: countcoordinatesX(30),
    },
    contentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: FONT_SIZE(10),
        fontWeight: 'normal',
        fontFamily: 'Helvetica Neue',
        color: kColor_Text_Gray,
    }
});