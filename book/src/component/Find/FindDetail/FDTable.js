import React, { Component } from 'react';
import {
    View,
    Text,
    SectionList,
    StyleSheet
} from 'react-native';
import FDHeader from '~/component/Find/FindDetail/FDHeader'
import FDSectionHeader from '~/component/Find/FindDetail/FDSectionHeader'
import FDCell from '~/component/Find/FindDetail/FDCell'

export default class FDTable extends Component {


    _ListHeaderComponent = ()=>{
        return (
            <FDHeader/>
        )
    }
    _renderSectionHeader = ()=>{
        return (
            <FDSectionHeader/>
        )
    }
    _renderItem = ({ item, index, section })=>{
        return (
            <FDCell/>
        )
    }
    render() {
        return (
            <SectionList
                style={styles.list}
                renderItem={this._renderItem}
                ListHeaderComponent={this._ListHeaderComponent}
                renderSectionHeader={this._renderSectionHeader}
                sections={[
                    { title: "Title1", data: ["item1", "item2"] }
                ]}
                keyExtractor={(item, index) => item + index}
            />
        );
    }
}

const styles = StyleSheet.create({
    
});