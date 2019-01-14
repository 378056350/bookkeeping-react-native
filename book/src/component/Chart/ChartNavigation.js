import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import time_down from '~/assets/image/time_down.png'


export default class ChartNavigation extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.8} style={styles.touch}>
                    <View style={styles.item}>
                        <Text style={styles.name}>{this.props.navigationIndex == 0 ? '收入' : '支出'}</Text>
                        <Image source={time_down} resizeMode={'contain'} style={styles.icon}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: NAVIGATION_HEIGHT,
        backgroundColor: kColor_Main_Color,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: STATUS_BAR_HEIGHT,
    },
    touch: {
        width: SCREEN_WIDTH / 3,
        height: NAVIGATION_HEIGHT - STATUS_BAR_HEIGHT
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH / 3,
        height: NAVIGATION_HEIGHT - STATUS_BAR_HEIGHT
    },
    name: {
        fontSize: FONT_SIZE(16)
    },
    icon: {
        width: countcoordinatesX(40),
    }
});