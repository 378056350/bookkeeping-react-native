import React, { Component } from 'react';
import {
    View,
    SectionList,
    StyleSheet
} from 'react-native';
import FDHeader from '~/component/Find/FindDetail/FDHeader'
import FDSectionHeader from '~/component/Find/FindDetail/FDSectionHeader'
import FDCell from '~/component/Find/FindDetail/FDCell'

export default class FDTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentHeight: countcoordinatesX(200),
        }
    }

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
    _onScroll = (e)=>{
        const normal = countcoordinatesX(200)
        const contentOffsetY = e.nativeEvent.contentOffset.y
        const height = -contentOffsetY < 0 ? normal - contentOffsetY : -contentOffsetY + normal
        this.setState({
            contentHeight: height
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.back, {height: this.state.contentHeight}]}/>
                <SectionList
                    onScroll={this._onScroll}
                    renderItem={this._renderItem}
                    ListHeaderComponent={this._ListHeaderComponent}
                    renderSectionHeader={this._renderSectionHeader}
                    showsVerticalScrollIndicator={false}
                    stickySectionHeadersEnabled={false}
                    sections={this.props.models.data}
                    keyExtractor={(item, index) => item + index}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    back: {
        width: SCREEN_WIDTH,
        backgroundColor: kColor_Main_Color,
        position: 'absolute',
        top: 0,
    }
});