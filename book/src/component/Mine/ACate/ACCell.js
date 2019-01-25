import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { ImageManager } from '~/assets/json/ImageManager'


export default class ACCell extends Component {

    subdata = ()=>{
        var arr = []
        for (let i=0; i<this.props.modal.length; i++) {
            const choose = this.props.choose
            const modal = this.props.modal
            const image = ImageManager[(choose.section == this.props.section && choose.row == i) ? modal[i].icon_s : modal[i].icon_n] 
            arr.push(
                <TouchableOpacity 
                    key={i} 
                    activeOpacity={0.9}
                    style={styles.iconTouch} 
                    onPress={()=>this.props.onPress(i, this.props.section)} 
                >
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
        // iPhone5s 不减1会有问题
        width: (SCREEN_WIDTH - countcoordinatesX(20) - 1) / 5,
        height: (SCREEN_WIDTH - countcoordinatesX(20) - 1) / 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: ACATE_IMAGE_W,
        height: ACATE_IMAGE_W,
    }
});