import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import BKCalculation from '~/component/Book/Book/Keyboard/BKCalculation'


export default class BKButton extends Component {
    // 初始化
    render() {
        return (
            <TouchableHighlight 
                onPress={()=>this.props.onPress(this.props.index)} 
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
                    <Text style={[styles.name, {
                        fontSize: (BKCalculation.isDate(this.props.index) && this.props.title !== '今天') ? FONT_SIZE(12) : FONT_SIZE(16)
                    }]}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    // 内容
    getButtonContent = (index, date)=>{
        if (index == 0) {
            return '7'
        } else if (index == 1) {
            return '8'
        } else if (index == 2) {
            return '9'
        } else if (index == 3) {
            return '今天'
        } else if (index == 4) {
            return '4'
        } else if (index == 5) {
            return '5'
        } else if (index == 6) {
            return '6'
        } else if (index == 7) {
            return '+'
        } else if (index == 8) {
            return '1'
        } else if (index == 9) {
            return '2'
        } else if (index == 10) {
            return '3'
        } else if (index == 11) {
            return '-'
        } else if (index == 12) {
            return '.'
        } else if (index == 13) {
            return '0'
        } else if (index == 14) {
            return 'delete'
        } else if (index == 15) {
            return '完成'
        }
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