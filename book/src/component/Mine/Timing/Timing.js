import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import TTable from '~/component/Mine/Timing/TTable'
import TButton from '~/component/Mine/Timing/TButton'


export default class Category extends Component {
    render() {
        return (
            <BaseContainer 
                navigation={this.props.navigation} 
                title={'定时提醒'}
            >
                <TTable/>
                <TButton/>
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