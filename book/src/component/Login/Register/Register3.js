import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import KUILoginField from '~/common/KUILoginField/KUILoginField'
import KUIButton from '~/common/KUIButton/KUIButton'

export default class Register3 extends Component {
    render() {
        return (
            <BaseContainer title={'注册'} navigation={this.props.navigation}  style={styles.container}>
                <KUILoginField 
                    name={'新密码'} 
                    field={'请输入密码'} 
                    style={styles.code}
                    keyboardType={'numeric'}
                    secureTextEntry={true}
                    maxLength={12}
                />
                <KUILoginField 
                    name={'确认密码'} 
                    field={'请确认密码'} 
                    style={styles.code}
                    keyboardType={'numeric'}
                    secureTextEntry={true}
                    maxLength={12}
                />
                <Text style={styles.text}>密码为6-14位字符串</Text>
                <KUIButton 
                    name={'完成'} 
                    onPress={()=>{}}
                    style={styles.button}
                    disabled={true}
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
    code: {
        marginTop: countcoordinatesX(10)
    },
    text: {
        marginTop: countcoordinatesX(10),
        marginLeft: countcoordinatesX(30),
        alignSelf: 'flex-start',
        fontSize: FONT_SIZE(8),
        fontWeight: '100',
        color: kColor_Text_Gray,
    }, 
    button: {
        marginTop: countcoordinatesX(40),
    }
});