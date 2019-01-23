import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { CategoryImage } from '~/assets/json/CategoryImage';


export default class BookCell extends Component {

    render() {
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={this.props.onPress} style={styles.container}>
                <View style={styles.view}>
                    <Image 
                        resizeMode={'contain'} 
                        source={this.props.choose == true ? CategoryImage[this.props.model.icon_s] : CategoryImage[this.props.model.icon_n]} 
                        style={styles.icon}
                    />
                    <Text style={styles.name}>{this.props.model.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const ITEM_W = (SCREEN_WIDTH - countcoordinatesX(60)) / 4
const styles = StyleSheet.create({
    container: {
        width: ITEM_W,
        paddingBottom: countcoordinatesX(30),
    },
    view: {
        flex: 1,
        alignItems: 'center',
    },
    icon: {
        width: ITEM_W / 5 * 3,
        height: ITEM_W / 5 * 3,
    },
    name: {
        fontSize: FONT_SIZE(12),
        fontWeight: '300',
        color: kColor_Text_Black,
        paddingTop: countcoordinatesX(10),
    }
    
});