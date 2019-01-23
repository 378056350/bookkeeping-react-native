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
            arr.push(<ChartDateCell key={i}/>)
        }
        return arr
    }
    
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.content}>
                        {this.subitem()}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: countcoordinatesX(120),
        backgroundColor: 'white',
    },
    scroll: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: countcoordinatesX(120),
    },
    content: {
        flex: 1,
        width: SCREEN_WIDTH,
    }
});