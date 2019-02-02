import React, { Component } from 'react';
import {
    View,
    SectionList,
    StyleSheet
} from 'react-native';
import FindCell from '~/component/Find/Find/FindCell'


export default class FindTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { title: "0", data: [{"name": "徽章"}]},
                { title: "1", data: []}
            ]
        }
    }

    // Cell
    _renderItem = (item, index, section)=>{
        return (
            <FindCell data={item} onPress={this.props.onPress}/>
        )
    }

    // 组头视图
    _renderSectionHeader = ({ section: { title } })=>{
        return (
            <View style={[styles.header, {height: title === "0" ? 0 : countcoordinatesX(30)}]}/>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    renderItem={({ item, index, section }) => this._renderItem(item, index, section)}
                    renderSectionHeader={this._renderSectionHeader}
                    sections={this.state.data}
                    ItemSeparatorComponent={this._itemSeparatorComponent}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => item + index}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    header: {
        width: SCREEN_WIDTH,
        backgroundColor: kColor_BG,
    },
});