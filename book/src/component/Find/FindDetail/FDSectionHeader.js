import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';


export default class FDSectionHeader extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.name}>月份</Text>
                <Text style={styles.name}>收入</Text>
                <Text style={styles.name}>支出</Text>
                <Text style={styles.name}>结余</Text>
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
        paddingLeft: countcoordinatesX(30),
        paddingRight: countcoordinatesX(30),
        borderBottomColor: kColor_Line_Color,
        borderBottomWidth: countcoordinatesX(1),
    },
    name: {
        flex: 1,
        fontSize: FONT_SIZE(12),
        fontWeight: '300',
        color: kColor_Text_Black,
    }
    
});