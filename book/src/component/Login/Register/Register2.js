import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import KUILoginField from '~/common/KUILoginField/KUILoginField'
import KUIButton from '~/common/KUIButton/KUIButton'

export default class Register2 extends Component {

    _onPress = ()=>{
        this.props.navigation.navigate('Register3')
    }

    render() {
        return (
            <BaseContainer title={'注册'} navigation={this.props.navigation}  style={styles.container}>
                <KUILoginField 
                    name={'手机号'} 
                    field={'请输入手机号'} 
                    style={styles.phone}
                    keyboardType={'numeric'}
                    isPhoneNumber={true}
                />
                <KUILoginField 
                    name={'验证码'} 
                    field={'输入验证码'} 
                    style={styles.code}
                    keyboardType={'numeric'}
                    isCode={true}
                    maxLength={6}
                />
                <KUIButton 
                    name={'下一步'} 
                    onPress={this._onPress}
                    style={styles.button}
                    // disabled={true}
                />
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        backgroundColor: 'white',
    },
    phone: {
        marginTop: countcoordinatesX(40)
    },
    code: {
        marginTop: countcoordinatesX(10)
    },
    button: {
        marginTop: countcoordinatesX(40),
    }
});