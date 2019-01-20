import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';


export default class BCell extends Component {

    subview = ()=>{
        var arr = [];
        for (let i=1; i<10; i++) {
            arr.push (
                <View key={i} style={styles.item}>
                    <Image style={styles.icon}/>
                    <Text style={styles.name}>asdasd</Text>
                </View>
            )
        }
        return arr
    }

    render() {
        return (
            <View style={styles.container}>
                {this.subview()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: countcoordinatesX(30),
        paddingRight: countcoordinatesX(30),
        paddingTop: countcoordinatesX(20),
        paddingBottom: countcoordinatesX(20),
        backgroundColor: 'white',
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (SCREEN_WIDTH - countcoordinatesX(60)) / 3,
        paddingBottom: countcoordinatesX(10),
    },
    icon: {
        width: (SCREEN_WIDTH - countcoordinatesX(60)) / 3 - countcoordinatesX(20),
        height: (SCREEN_WIDTH - countcoordinatesX(60)) / 3 - countcoordinatesX(20),
        backgroundColor: 'orange',
    },
    name: {
        fontSize: FONT_SIZE(14),
        fontWeight: '300',
        color: kColor_Text_Black,
    }
});