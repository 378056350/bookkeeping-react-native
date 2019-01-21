import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';


export default class BKButton extends Component {
    // 初始化
    render() {
        return (
            <TouchableHighlight 
                onPress={()=>{}} 
                style={[styles.container, {
                    borderBottomWidth: countcoordinatesX(2),
                    borderBottomColor: kColor_Line_Color,
                    borderRightWidth: countcoordinatesX(2),
                    borderRightColor: kColor_Line_Color,
                    backgroundColor: this.props.index != 15 ? 'white' : kColor_Main_Color,
                }]} 
                underlayColor={this.props.index != 15 ? kColor_BG : kColor_Main_Dark_Color}
            >
                <View style={styles.view}>
                    <Text style={styles.name}>{this.props.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: FONT_SIZE(16),
        fontWeight: '400',
        color: kColor_Text_Black,
    }
});