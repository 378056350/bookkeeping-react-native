import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet
} from 'react-native';
import ChartDateCell from './ChartDateCell'


export default class ChartDate extends Component {


    subitem = ()=>{
        var arr = []
        for (var i=1; i<=20; i++) {
            arr.push(<ChartDateCell key={i} choose={i == 1}/>)
        }
        return arr
    }
    
    render() {
        return (
            <View style={styles.container}>
                <ScrollView 
                    style={styles.scroll} 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles.content}>
                        {this.subitem()}
                    </View>
                    <View style={styles.line}/>
                </ScrollView>
            </View>
        );
    }
}

const height = countcoordinatesX(80)
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: height,
        backgroundColor: 'white',
        borderBottomWidth: countcoordinatesX(1),
        borderBottomColor: kColor_Line_Color,
    },
    scroll: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: height,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
    },
    line: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: countcoordinatesX(100),
        height: countcoordinatesX(3),
        backgroundColor: kColor_Text_Black,
    }
});