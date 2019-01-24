import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';


export default class KUILoginField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            length: 0,
            name: '重新获取',

        }
    }

    _onChangeText = (text)=>{
        if (this.props.isPhoneNumber == false) {
            this.setState({
                text: text
            })
        }
        else {
            // 输入
            var length = text.length
            if (length > this.state.length) {
                if (length == 4 || length == 9) {
                    text = this.state.text + "-"
                }
                // 输入完成
                if (length >= 13) {
                    text = text.substring(0, 13)
                }
                this.setState({
                    length: text.length,
                    text: text
                })
            }
            // 删除
            else if (length < this.state.length) {
                if (length == 4 || length == 9) {
                    text = text.substring(0, text.length - 1)
                }
                this.setState({
                    length: text.length,
                    text: text
                })
            }

            // if (textField.text.length > index) {
            //     // 输入
            //     if (textField.text.length == 4 || textField.text.length == 9 ) {
            //         NSMutableString * str = [[NSMutableString alloc ] initWithString:textField.text];
            //         [str insertString:@"-" atIndex:(textField.text.length-1)];
            //         textField.text = str;
            //         [self buttonCanTap:false];
            //     }
            //     // 输入完成
            //     if (textField.text.length >= 13) {
            //         textField.text = [textField.text substringToIndex:13];
            //         [self buttonCanTap:true];
            //     }
            //     index = textField.text.length;
            // }
            // // 删除
            // else if (textField.text.length < index) {
            //     if (textField.text.length == 4 || textField.text.length == 9) {
            //         textField.text = [NSString stringWithFormat:@"%@",textField.text];
            //         textField.text = [textField.text substringToIndex:(textField.text.length-1)];
            //     }
            //     index = textField.text.length;
            //     [self buttonCanTap:false];
            // }
        }
    }

    _onPress = ()=>{
        this.timeOut(59)
        this.setState({name: '60s重新获取'})
    }

    blur = ()=>{
        this.refs.input.blur()
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    timeOut = (time)=>{
        this.timer = setTimeout(() => { 
            if (time > 0) {
                this.setState({name: time + 's重新获取'})
                this.timeOut(time - 1)
            } else {
                this.setState({name: '重新获取'})
                clearTimeout(this.timer)
            }
        },1000);
    }

    code = ()=>{
        return (
            <View style={styles.code}>
                <View style={styles.line}/>
                <TouchableOpacity activeOpacity={0.8} onPress={this._onPress} style={styles.button}>
                    <Text style={styles.buttonText}>{this.state.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={[styles.container, {...this.props.style}]}>
                <Text style={[styles.names, {width: countcoordinatesX(120)}]}>{this.props.name}</Text>
                <TextInput
                    ref={'input'}
                    style={styles.input}
                    selectionColor={kColor_Main_Color}
                    keyboardType={this.props.keyboardType}  // 0: 普通  1: 数字
                    placeholder={this.props.field}
                    placeholderTextColor={kColor_Text_Gray}
                    clearButtonMode={'while-editing'}
                    maxLength={this.props.isPhoneNumber === false ? this.props.maxLength : 13}
                    value={this.state.text}
                    secureTextEntry={this.props.secureTextEntry}
                    onChangeText={this._onChangeText}
                />
                {this.props.isCode && this.code()}
            </View>
        );
    }
}

KUILoginField.propTypes = {
    // 是否是手机号
    isPhoneNumber: PropTypes.bool.isRequired,
    // 是否显示获取验证码
    isCode: PropTypes.bool.isRequired,
}
KUILoginField.defaultProps = {
    // 是否是手机号
    isPhoneNumber: false,
    // 是否显示获取验证码
    isCode: false
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH - countcoordinatesX(60),
        height: countcoordinatesX(90),
        borderBottomColor: kColor_Line_Color,
        borderBottomWidth: countcoordinatesX(1),
    },
    names: {
        marginRight: countcoordinatesX(40),
        fontSize: FONT_SIZE(12),
        fontWeight: '100',
        color: kColor_Text_Black,
    },
    input: {
        flex: 1,
        height: countcoordinatesX(90),
        fontSize: FONT_SIZE(12),
        fontWeight: '100',
        color: kColor_Text_Black,
    },
    code: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: countcoordinatesX(90),
        width: countcoordinatesX(220),
    },
    line: {
        backgroundColor: kColor_Line_Color,
        height: countcoordinatesX(45),
        width: countcoordinatesX(1),
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: countcoordinatesX(90),
        width: countcoordinatesX(200),
        paddingLeft: countcoordinatesX(30),
        paddingRight: countcoordinatesX(30),
    },
    buttonText: {
        fontSize: FONT_SIZE(10),
        color: kColor_Text_Black,
        fontWeight: '200',
        fontFamily: 'Helvetica Neue',
    }
});
