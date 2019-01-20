import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import BookCell from '~/component/Book/Book/BookCell'

export default class BookScroll extends Component {


    scrollItem = ()=>{
        var array = []
        var subarray = []
        for (let i=1; i<=2; i++) {
            for (let y=1; y<=19; y++) {
                subarray.push(<BookCell key={y + i * 19}/>)
            }
            array.push (
                <ScrollView 
                    key={i}
                    style={styles.list}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.listContent}>
                        {subarray}
                    </View>
                </ScrollView>
            )
        }
        return array
    }
    
    render() {
        return (
            <ScrollView 
                horizontal={true} 
                pagingEnabled={true}
                style={styles.scroll}
                showsHorizontalScrollIndicator={false}
            >
                {this.scrollItem()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: 'red',
    },
    list: {
        width: SCREEN_WIDTH,
        backgroundColor: 'green',
        flexWrap: 'wrap',
    },
    listContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: SCREEN_WIDTH,
        paddingLeft: countcoordinatesX(30),
        paddingTop: countcoordinatesX(20),
        paddingBottom: countcoordinatesX(20),
    },
    item: {
        width: SCREEN_WIDTH / 4,
        height: SCREEN_WIDTH / 4,
    }
});