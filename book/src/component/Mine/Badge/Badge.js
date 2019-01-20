import React, { Component } from 'react';
import {
    View,
    Text,
    SectionList,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import BHeader from './BHeader'
import BFooter from './BFooter'
import BCell from './BCell'


export default class Badge extends Component {

    _renderItem = ({ item, index, section })=>{
        return (
            <BCell/>
        )
    }
    _renderSectionHeader = ({section: { title }})=>{
        return (
            <BHeader/>
        )
    }
    _renderSectionFooter = ()=>{
        return (
            <BFooter/>
        )
    }

    render() {
        return (
            <BaseContainer 
                navigation={this.props.navigation} 
                title={'徽章'}
            >
                <SectionList
                    style={styles.container}
                    renderItem={this._renderItem}
                    renderSectionHeader={this._renderSectionHeader}
                    renderSectionFooter={this._renderSectionFooter}
                    showsVerticalScrollIndicator={false}
                    stickySectionHeadersEnabled={false}
                    sections={[
                        { title: "Title1", data: ["item1"] },
                        { title: "Title1", data: ["item1"] },
                        { title: "Title1", data: ["item1"] }
                    ]}
                    keyExtractor={(item, index) => item + index}
                />
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: kColor_BG
    },
    list: {

    },
    sectionHeader: {

    },
    item: {

    }
});