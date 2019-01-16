import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet
} from 'react-native';
import ChartDateCell from './ChartDateCell'


export default class ChartDate extends Component {



    _renderItem = (item)=>{
        return (
            <ChartDateCell/>
        )
    }
    
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.table}
                    horizontal={true}
                    data={[{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}]}
                    renderItem={this._renderItem}
                />
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
        backgroundColor: 'red',
    },
    table: {
        width: SCREEN_WIDTH,
        backgroundColor: 'orange',
    }
});