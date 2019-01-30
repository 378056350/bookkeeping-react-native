import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { ImageManager } from '~/assets/json/ImageManager';
const time_down = require('~/assets/image/time_down.png')
const chartX = countcoordinatesX(30)
const tagW = SCREEN_WIDTH / 2
const iconW = countcoordinatesX(40)
const iconH = iconW / 2


export default class CTTag extends Component {


    list = ()=>{
        var arr = []
        const count = this.props.models[0].chartArr[this.props.currentSelect].length
        arr.push(<Text key={0} style={styles.name}>最大3笔交易</Text>)

        for (var i=1; i<=(count > 3 ? 3 : count); i++) {
            const model = this.props.models[0].chartArr[i]
            arr.push (
                <View key={i} style={styles.cell}>
                    <Image source={ImageManager[model.icon_n]} resizeMode={'contain'} style={styles.cellIcon}/>
                    <Text style={[styles.text, {marginLeft: countcoordinatesX(10)}]}>阿萨德</Text>
                    <Text style={styles.text}>阿萨德</Text>
                    <Text style={styles.text}>阿萨德</Text>
                </View>
            )
        }
        return arr
    }

    empty = ()=>{
        return (
            <View style={styles.empty}>
                <Text style={styles.emptyText}>没有费用</Text>
            </View>
        )
    }

    render() {
        const count = this.props.models[0].chartArr[this.props.currentSelect].length
        const left = this.props.left - tagW / 2 + 1
        var contentL = 0
        contentL = left < -chartX ? -left - chartX : contentL
        contentL = (left + tagW + chartX) > SCREEN_WIDTH ? SCREEN_WIDTH - (left + tagW) : contentL
        return (
            <View style={[styles.container, {
                left: left,
                bottom: this.props.bottom
            }]}>
                <View style={[styles.content, {
                    left: contentL,
                    paddingBottom: count != 0 ? countcoordinatesX(10) : 0,
                }]}>
                    {count != 0 && this.list()}
                    {count == 0 && this.empty()}
                </View>
                <View style={styles.bottom}>
                    <Image source={time_down} resizeMethod={'scale'} style={[styles.icon]}/>
                    <View style={[styles.line]}/>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: tagW,
    },
    content: {
        backgroundColor: kColor_Text_Black,
        width: tagW,
        bottom: -2,
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
    },
    empty: {
        justifyContent: 'center',
        alignItems: 'center',
        height: countcoordinatesX(100),
    },
    emptyText: {
        fontSize: FONT_SIZE(12),
        fontWeight: '300',
        color: kColor_Line_Color,
    },
    name: {
        textAlign: 'center',
        fontSize: FONT_SIZE(10),
        fontWeight: '400',
        color: kColor_Line_Color,
        backgroundColor: kColor_Text_Black_Light,
        paddingTop: countcoordinatesX(5),
        paddingBottom: countcoordinatesX(5),
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
        marginLeft: countcoordinatesX(20),
        marginRight: countcoordinatesX(20),
        marginTop: countcoordinatesX(15),
        marginBottom: countcoordinatesX(5),
    },
    cell: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: countcoordinatesX(20),
        marginRight: countcoordinatesX(20),
        height: countcoordinatesX(35),
    },
    cellIcon: {
        width: countcoordinatesX(25),
        height: countcoordinatesX(25),
        backgroundColor: 'red',
    },
    text: {
        fontSize: FONT_SIZE(8),
        fontWeight: '400',
        color: kColor_Line_Color,
        flex: 1,
    },
    bottom: {
        width: tagW,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: iconW,
        height: iconH,
        position: 'relative',
        bottom: -1,
    },
    line: {
        width: countcoordinatesX(5),
        height: countcoordinatesX(100),
        backgroundColor: kColor_Text_Black,
    }
});