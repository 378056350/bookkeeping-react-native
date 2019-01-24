import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Picker,
    StyleSheet
} from 'react-native';
import KUIButton from '~/common/KUIButton/KUIButton'


export default class LOtherLogin extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.other}>
                    <View style={styles.line}/>
                    <Text style={styles.name}>其他登录方式</Text>
                </View>
                <KUIButton 
                    name={'QQ登录'} 
                    onPress={this._onPress}
                    style={styles.login}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: countcoordinatesX(150) + SAFE_AREA_BOTTOM_HEIGHT,
    },
    other: {
        width: SCREEN_WIDTH - countcoordinatesX(60),
        height: countcoordinatesX(80),
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: FONT_SIZE(12),
        fontWeight: '300',
        color: kColor_Text_Gray,
        backgroundColor: 'white',
        paddingLeft: countcoordinatesX(20),
        paddingRight: countcoordinatesX(20),
    },
    line: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: countcoordinatesX(40),
        height: countcoordinatesX(2),
        backgroundColor: kColor_Line_Color,
    },
    login: {
        marginTop: countcoordinatesX(20),
    }
});