import React, { Component } from 'react';
import {
    View,
    Text,
    SectionList,
    StyleSheet
} from 'react-native';
import ACCell from './ACCell'
const ACA = require('~/assets/json/ACA.json')


export default class ACTable extends Component {


    datas = ()=>{
        var datas = []
        for (var i=0; i<ACA.length; i++) {
            var modal = {}
            modal.title = ACA[i].name
            var subdatas = []
            for (var y=0; y<ACA[i].list.length; y++) {
                subdatas.push(ACA[i].list[y])
            }
            modal.data = [subdatas]
            modal.section = i
            datas.push(modal)
        }
        return datas
    }
    _renderSectionHeader = ({ section: { title } })=>{
        return (
            <View style={styles.header}>
                <Text style={styles.name}>{title}</Text>
            </View>
        )
    }
    _renderItem = ({ item, index, section })=>{
        return (
            <ACCell 
                modal={item} 
                onPress={this.props.onPress} 
                section={section.section} 
                choose={this.props.choose}
            />
        )
    }
    
    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    renderItem={this._renderItem}
                    renderSectionHeader={this._renderSectionHeader}
                    showsVerticalScrollIndicator={false}
                    stickySectionHeadersEnabled={false}
                    sections={this.datas()}
                    keyExtractor={(item, index) => item + index}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: SAFE_AREA_BOTTOM_HEIGHT,
        paddingLeft: countcoordinatesX(10),
        paddingRight: countcoordinatesX(10),
        width: SCREEN_WIDTH,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: countcoordinatesX(100),
    },
    name: {
        fontSize: FONT_SIZE(14),
        fontWeight: '400',
        color: kColor_Text_Black,
    }
});