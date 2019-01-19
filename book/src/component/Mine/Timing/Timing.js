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
                title={'定时提醒'}
            >
                <Text>定时提醒</Text>
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