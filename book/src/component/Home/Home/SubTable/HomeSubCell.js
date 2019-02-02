import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import { ImageManager } from '~/assets/json/ImageManager'

export default class HomeSubCell extends Component {

    render() {
        const model = this.props.model
        return (
            <TouchableHighlight 
                underlayColor={kColor_Text_Gray} 
                onPress={this.props.onPress} 
                style={styles.containerTouch}
            >
                <View style={styles.container}>
                    <View style={styles.left}>
                        <Image 
                            source={ImageManager[model.cmodel.icon_l]} 
                            resizeMode={'contain'} 
                            style={styles.icon}
                        />
                        <Text style={styles.name}>{model.cmodel.name}</Text>
                    </View>
                    <Text style={styles.detail}>{model.cmodel.is_income == true ? parseFloat(model.price) + "" : '-' + parseFloat(model.price)}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    containerTouch: {
        width: SCREEN_WIDTH,
        height: countcoordinatesX(100),
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: countcoordinatesX(100),
        backgroundColor: 'white',
        paddingLeft: countcoordinatesX(30),
        paddingRight: countcoordinatesX(30),
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: countcoordinatesX(60),
        height: countcoordinatesX(60),
    },
    name: {
        fontSize: FONT_SIZE(12),
        fontWeight: '300',
        fontFamily: 'Helvetica Neue',
        color: kColor_Text_Black,
        paddingLeft: countcoordinatesX(20),
    },
    detail: {
        fontSize: FONT_SIZE(12),
        fontWeight: '300',
        color: kColor_Text_Black,
    }
});