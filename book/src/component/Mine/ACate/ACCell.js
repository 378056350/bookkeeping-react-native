import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { ACAImage } from '~/assets/json/ACAImage'


export default class ACCell extends Component {

    subdata = ()=>{
        var arr = []
        for (let i=0; i<this.props.modal.length; i++) {
            const choose = this.props.choose
            const modal = this.props.modal
            const image = ACAImage[(choose.section == this.props.section && choose.row == i) ? modal[i].icon_s : modal[i].icon_n] 
            arr.push(
                <TouchableOpacity key={i + 1} onPress={()=>this.props.onPress(i, this.props.section)} activeOpacity={0.9} style={styles.iconTouch}>
                    <Image resizeMode={'contain'} source={image} style={styles.icon}/>
                </TouchableOpacity>
            )
        }
        return arr
    }

    render() {
        return (
            <View style={styles.container}>
                {this.subdata()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    iconTouch: {
        width: (SCREEN_WIDTH - countcoordinatesX(20)) / 5,
        height: (SCREEN_WIDTH - countcoordinatesX(20)) / 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: ACATE_IMAGE_W,
        height: ACATE_IMAGE_W,
    }
});