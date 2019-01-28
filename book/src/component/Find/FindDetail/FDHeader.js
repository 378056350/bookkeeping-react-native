import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';


export default class FDHeader extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.name}>结余</Text>
                <Text style={styles.detail}>{this.props.data.data.toFixed(2)}</Text> 
                <View style={styles.info}>
                    <View style={styles.infoDetail}>
                        <Text style={styles.idName}>收入</Text>
                        <Text style={styles.idDetail}>{this.props.data.income.toFixed(2)}</Text>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.infoDetail}>
                        <Text style={styles.idName}>支出</Text>
                        <Text style={styles.idDetail}>{this.props.data.pay.toFixed(2)}</Text>
                    </View>
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        paddingTop: countcoordinatesX(20),
        paddingBottom: countcoordinatesX(20),
        backgroundColor: kColor_Main_Color,
    },
    name: {
        fontSize: FONT_SIZE(14),
        fontWeight: '300',
        color: kColor_Text_Black,
    },
    detail: {
        fontSize: FONT_SIZE(30),
        fontWeight: '300',
        color: kColor_Text_Black,
        marginTop: countcoordinatesX(10),
    },
    line: {
        height: countcoordinatesX(30),
        width: countcoordinatesX(1),
        backgroundColor: kColor_Text_Black,
    },
    info: {
        flexDirection: 'row',
        marginTop: countcoordinatesX(30),
    },
    infoDetail: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    idName: {
        fontSize: FONT_SIZE(12),
        fontWeight: '300',
        color: kColor_Text_Black,
    },
    idDetail: {
        fontSize: FONT_SIZE(14),
        fontWeight: '300',
        color: kColor_Text_Black,
        marginLeft: countcoordinatesX(5),
    }
});