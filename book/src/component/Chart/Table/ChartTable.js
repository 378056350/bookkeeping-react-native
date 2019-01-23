import React, { Component } from 'react';
import {
    View,
    Text,
    SectionList,
    StyleSheet
} from 'react-native';
import CTHeader from './CTHeader'
import CTSectionHeader from './CTSectionHeader'
import CTHeaderCell from './CTHeaderCell'


export default class ChartTable extends Component {


    _ListHeaderComponent = ()=>{
        return (
            <CTHeader/>
        )
    }
    _renderSectionHeader = ()=>{
        return (
            <CTSectionHeader/>
        )
    }
    _renderItem = ({ item, index, section })=>{
        return (
            <CTHeaderCell/>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    style={styles.list}
                    ListHeaderComponent={this._ListHeaderComponent}
                    renderSectionHeader={this._renderSectionHeader}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => item + index}
                    sections={[
                        { title: "Title1", data: ["item1", "item2"] }
                    ]}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        backgroundColor: 'white',
    },
    list: {
        
    }
});