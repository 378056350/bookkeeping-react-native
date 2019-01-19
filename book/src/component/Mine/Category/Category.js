import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'


export default class Category extends Component {
    render() {
        return (
            <BaseContainer 
                navigation={this.props.navigation} 
                title={'类别设置'}
            >
                <Text>类别设置</Text>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});