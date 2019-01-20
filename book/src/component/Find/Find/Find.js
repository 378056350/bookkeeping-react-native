import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import FindTable from '~/component/Find/Find/FindTable'

export default class Find extends Component {

    _onCellPress = ()=>{
        this.props.navigation.navigate('FindDetail')
    }

    render() {
        return (
            <BaseContainer hasLeft={true} title={'发现'}>
                <FindTable onPress={this._onCellPress}/>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
});