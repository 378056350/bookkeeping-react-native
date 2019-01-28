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
            <FDHeader data={this.props.models.main}/>
        )
    }
    _renderSectionHeader = ()=>{
        return (
            <FDSectionHeader/>
        )
    }
    _renderItem = ({ item, index, section })=>{
        return (
            <FDCell model={item}/>
        )
    }
    render() {
        return (
            <SectionList
                style={styles.list}
                renderItem={this._renderItem}
                ListHeaderComponent={this._ListHeaderComponent}
                renderSectionHeader={this._renderSectionHeader}
                showsVerticalScrollIndicator={false}
                sections={this.props.models.data}
                keyExtractor={(item, index) => item + index}
            />
        );
    }
}

const styles = StyleSheet.create({
    
});