import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Picker,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import KUILoginField from '~/common/KUILoginField/KUILoginField'
import KUIButton from '~/common/KUIButton/KUIButton'
import LAction from './LAction'
import LOtherLogin from './LOtherLogin'
const login_close = require('~/assets/image/login_close.png')


export default class Login2 extends Component {

    // 关闭
    _onClose = ()=>{
        this.props.navigation.goBack()
    }
    // 点击背景
    _onTouchBg = ()=>{
        this.refs.phone.blur();
        this.refs.password.blur();
        
    }
    // 操作
    _onActionPress = (index)=>{
        // 忘记密码
        if (index == 0) {

        } 
        // 注册
        else if (index == 1) {
            this.props.navigation.navigate('Register')
        }
    }


    render() {
        return (
            <BaseContainer 
                navigation={this.props.navigation} 
                hasHeader={false}
                statusColor={kColor_White}
                style={{flex: 1}}
            >
                <TouchableOpacity style={styles.container} activeOpacity={1.0} onPress={this._onTouchBg}>
                    <View>
                        <TouchableOpacity onPress={this._onClose} style={styles.closePress}>
                            <Image source={login_close}/>
                        </TouchableOpacity>
                        <KUILoginField 
                            ref={'phone'}
                            name={'手机号'} 
                            field={'请输入手机号'} 
                            style={styles.phone}
                            keyboardType={'numeric'}
                            isPhoneNumber={true}
                        />
                        <KUILoginField 
                            ref={'password'}
                            name={'密码'} 
                            field={'请输入密码'} 
                            style={styles.password}
                            keyboardType={'numeric'}
                            isPhoneNumber={false}
                            secureTextEntry={true}
                        />
                        <KUIButton 
                            name={'登录'} 
                            onPress={this._onPress}
                            style={styles.login}
                        />
                        <LAction onPress={this._onActionPress}/>
                    </View>
                    <LOtherLogin/>
                </TouchableOpacity>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        backgroundColor: 'white',
        paddingTop: STATUS_BAR_HEIGHT,
    },
    // 关闭
    closePress: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: countcoordinatesX(80),
        height: countcoordinatesX(80),
    },
    // 手机号
    phone: {
        marginTop: countcoordinatesX(40)
    },
    // 密码
    password: {
        marginTop: countcoordinatesX(20)
    },
    // 登录
    login: {
        marginTop: countcoordinatesX(80),
    },
});