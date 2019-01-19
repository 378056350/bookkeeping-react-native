import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import FindTable from '~/component/Find/FindTable'

export default class Find extends Component {
    render() {
        return (
            <BaseContainer hasBack={false}>
                <FindTable/>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
});