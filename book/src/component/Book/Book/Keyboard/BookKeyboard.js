import React, { Component } from 'react';
import {
    View,
    Text,
    Animated,
    Easing,
    StyleSheet
} from 'react-native';
import BKField from './BKField'
import BKButton from './BKButton'


export default class BookKeyboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyboardAnim: new Animated.Value(0),
        };
    }

    _switchAnimation() {
        Animated.timing(this.state.keyboardAnim,{ 
            duration: 400,
            easing: Easing.elastic(0),
            toValue: BOOK_KEYBOARD_H
        }).start((result)=>{
          
        });
    }
    
    getButtonContent = (index)=>{
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

    subitem = ()=>{
        var button = []
        for (var i=0; i<4; i++) {
            var subbutton = []
            for (var y=0; y<4; y++) {
                const key = i*4+y
                subbutton.push(
                    <BKButton key={key} index={key} title={this.getButtonContent(key)} style={styles.subview}/>
                )
            }
            button.push (
                <View key={i} style={styles.view}>
                    {subbutton}
                </View>
            )
        }
        return button
    }

    // 初始化
    render() {
        return (
            <Animated.View style={{height: this.state.keyboardAnim}}>
                <View style={styles.container}>
                    <BKField/>
                    {this.subitem()}
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: SCREEN_WIDTH,
        height: BOOK_KEYBOARD_H,
        paddingBottom: SAFE_AREA_BOTTOM_HEIGHT,
        shadowOffset: {width: 0, height: -2},
        shadowColor: kColor_Text_Gray,
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    view: {
        flex: 1,
        flexDirection: 'row',
    },
    subview: {

    }
});