import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
const about = require('~/assets/image/about.png')


export default class About extends Component {

    render() {
        return (
            <BaseContainer 
                style={styles.container}
                navigation={this.props.navigation} 
                title={'关于鲨鱼记账'}
            >
                <Image source={about} resizeMode={'contain'} style={styles.icon}/>
                <TouchableHighlight onPress={()=>{}} underlayColor={kColor_Line_Color} style={styles.nameTouch}>
                    <Text style={styles.name}>关注鲨鱼记账微信公众号</Text>
                </TouchableHighlight>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: kColor_BG,
    },
    icon: {
        width: SCREEN_WIDTH / 3 * 2,
        height: SCREEN_WIDTH / 3 * 2,
        marginTop: countcoordinatesX(100),
    },
    nameTouch: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: STATUS_TABBAR_HEIGHT + countcoordinatesX(80),
        width: SCREEN_WIDTH / 2,
        height: countcoordinatesX(90),
        backgroundColor: kColor_BG,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderWidth: countcoordinatesX(1),
        borderColor: kColor_Text_Gray,
    },
    name: {
        fontSize: FONT_SIZE(12),
        fontWeight: '300',
        color: kColor_Text_Black,
    },
});