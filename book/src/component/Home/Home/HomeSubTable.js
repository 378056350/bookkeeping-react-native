import React, { Component } from 'react';
import {
    View,
    SectionList,
    StyleSheet
} from 'react-native';
import HomeSubHeader from '~/component/Home/Home/HomeSubHeader'
import HomeSubCell from '~/component/Home/Home/HomeSubCell'


export default class HomeSubTable extends Component {

    _renderItem = ({item, index, section})=>{
        return (
            <HomeSubCell/>
        )
    }

    _renderSectionHeader = ({ section: { title } })=>{
        return (
            <HomeSubHeader/>
        )
    }

    _ItemSeparatorComponent = ()=>{
        return (
            <View style={styles.line}/>
        )
    }  

    render() {
        return (
            <View style={[styles.container, {...this.props.style}]}>
                <SectionList
                    renderSectionHeader={this._renderSectionHeader}
                    sections={[
                        { title: "Title1", data: ["item1", "item2"] },
                        { title: "Title2", data: ["item3", "item4"] },
                        { title: "Title3", data: ["item5", "item6"] }
                    ]}
                    keyExtractor={(item, index) => item + index}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT - NAVIGATION_HEIGHT - STATUS_TABBAR_HEIGHT - countcoordinatesX(120),
        width: SCREEN_WIDTH,
        backgroundColor: 'white',
    },
    line: {
        height: countcoordinatesX(1),
        backgroundColor: kColor_Line_Color,
    }
});