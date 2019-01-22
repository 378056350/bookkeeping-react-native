import React, { Component } from 'react';
import {
    View,
    Animated,
    Easing,
    Keyboard,
    StyleSheet
} from 'react-native';
import BKField from './BKField'
import BKButton from './BKButton'
import BKCalculation from '~/component/Book/Book/Keyboard/BKCalculation'


export default class BookKeyboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyboardAnim: new Animated.Value(0),
            inputAnim: new Animated.Value(0),
            money: "0"
        };
    }

    componentDidMount = () => {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardDidHide);
    }
    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    // 键盘显示
    _keyboardDidShow = (e)=>{
        const keyboardH = e.endCoordinates.height
        const inputKeyH = BOOK_KEYBOARD_H
        const inputH = countcoordinatesX(120)
        const offsetY = inputH - (inputKeyH - keyboardH)

        Animated.timing(this.state.inputAnim,{ 
            duration: 200,
            easing: Easing.elastic(0),
            toValue: -offsetY
        }).start((result)=>{
            
        });
    }
    // 键盘隐藏
    _keyboardDidHide = (e)=>{
        Animated.timing(this.state.inputAnim,{ 
            duration: 200,
            easing: Easing.elastic(0),
            toValue: 0
        }).start((result)=>{
          
        });
    }
    // 点击Item
    _onItemPress = (index)=>{
        // var arr = ["3", "123", "11.", "11.1", "11.11", "11.11+", "11.11+1", "11.11+11", "11.11+11.", "11.11+11.1", "11.11+11.11", "11.11+11.111"]
        // for (var i=0; i<arr.length; i++) {
        //     console.log(arr[i] + ": " + BKCalculation.isAllowPoint(arr[i]));
            
        // }

        var money = BKCalculation.getMoneyString(this.state.money, index)
        this.setState({
            money: money
        })
    }
    
    // 动画
    _switchAnimation(isShow) {
        Animated.timing(this.state.keyboardAnim,{ 
            duration: 400,
            easing: Easing.elastic(0),
            toValue: isShow == true ? BOOK_KEYBOARD_H : 0
        }).start((result)=>{
          
        });
    }
    


    //============================ 界面 ============================//
    // 按钮
    subitem = ()=>{
        var button = []
        for (var i=0; i<4; i++) {
            var subbutton = []
            for (var y=0; y<4; y++) {
                const key = i*4+y
                subbutton.push(
                    <BKButton 
                        key={key} 
                        index={key} 
                        title={BKCalculation.getButtonString(this.state.money, i*4+y)}
                        onPress={this._onItemPress}
                        style={styles.subview}
                    />
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
                <Animated.View style={styles.container}>
                    <BKField money={this.state.money} style={{top: this.state.inputAnim}}/>
                    {this.subitem()}
                </Animated.View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: SCREEN_WIDTH,
        height: BOOK_KEYBOARD_H,
        backgroundColor: kColor_BG,
        paddingBottom: SAFE_AREA_BOTTOM_HEIGHT,
    },
    view: {
        flex: 1,
        flexDirection: 'row',
    },
    subview: {

    }
});