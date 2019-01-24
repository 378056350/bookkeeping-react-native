import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Picker,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import ActionSheet from 'react-native-actionsheet'
const share_icon = require('~/assets/image/share_icon.png')
const share_shark = require('~/assets/image/share_shark_99x27_.png')
const login_close = require('~/assets/image/login_close.png')


export default class Login extends Component {

    _onClose = ()=>{
        this.props.navigation.goBack()
    }

    // 更多登录方式
    _onMoreLogin = ()=>{
        this.ActionSheet.show()
    }

    // 弹框
    _onActionSheet = (index)=>{
        if (index == 0) {
            this.props.navigation.navigate('Register', {'mode': 'push'})
        } else if (index == 1) {
            this.props.navigation.navigate('Login2', {'mode': 'push'})
        }
    }

    render() {
        return (
            <BaseContainer 
                navigation={this.props.navigation} 
                hasHeader={false}
                statusColor={kColor_White}
                style={styles.container}
            >
                <View style={styles.top}>
                    <TouchableOpacity onPress={this._onClose} style={styles.closePress}>
                        <Image source={login_close}/>
                    </TouchableOpacity>
                    <Image source={share_icon} style={styles.icon}/>
                    <Image source={share_shark} resizeMode={'contain'} style={styles.title}/>
                </View>
                <View style={styles.bottom}>
                    <TouchableHighlight onPress={()=>{}} activeOpacity={1.0} underlayColor={kColor_Main_Dark_Color} style={styles.login}>
                        <Text style={styles.loginText}>QQ登录</Text>
                    </TouchableHighlight>
                    <TouchableOpacity activeOpacity={0.6} onPress={this._onMoreLogin} style={styles.more}>
                        <Text style={styles.moreText}>更多登录方式</Text>
                    </TouchableOpacity>
                </View>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={['注册', '手机登录', '取消']}
                    cancelButtonIndex={2}
                    // destructiveButtonIndex={1}
                    onPress={this._onActionSheet}
                />
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
        paddingTop: iOS ? STATUS_BAR_HEIGHT : 0,
    },
    top: {
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom: {
        width: SCREEN_WIDTH - countcoordinatesX(120),
        marginLeft: countcoordinatesX(60),
        marginRight: countcoordinatesX(60),
        marginBottom: countcoordinatesX(40) + STATUS_TABBAR_HEIGHT,
    },
    // 关闭
    closePress: {
        alignSelf: 'flex-end',
        paddingTop: countcoordinatesX(20),
        paddingRight: countcoordinatesX(20),
        width: countcoordinatesX(80),
        height: countcoordinatesX(80),
    },
    // 图标
    icon: {
        width: (SCREEN_WIDTH - countcoordinatesX(50)) / 3,
        height: (SCREEN_WIDTH - countcoordinatesX(50)) / 3,
        marginTop: countcoordinatesX(20),
    },
    // 标题
    title: {
        marginTop: countcoordinatesX(30),
        height: countcoordinatesX(50),
    },
    // 按钮
    login: {
        height: countcoordinatesX(90),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: kColor_Main_Color,
        borderRadius: 3,
    },
    // 更多登录方式
    more: {
        marginTop: countcoordinatesX(40),
        height: countcoordinatesX(90),
        justifyContent: 'center',
        alignItems: 'center',
    },
    // 按钮
    loginText: {
        fontSize: FONT_SIZE(12),
        fontWeight: 'normal',
        color: kColor_Text_Black
    },
    // 更多登录方式
    moreText: {
        fontSize: FONT_SIZE(12),
        fontWeight: 'normal',
        color: kColor_Text_Gray
    }
});