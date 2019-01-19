import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import MineTable from '~/component/Mine/Mine/MineTable'

export default class Mine extends Component {

    // 点击个人信息
    _onInfoPress = ()=>{
        console.log("asdasdas");
        this.props.navigation.navigate('Login');
    }
    // 点击Cell
    _onItemPress = (item)=>{
        const {row, section} = item;
        
        if (section == 0) {
            this.props.navigation.navigate('Badge');
        }
    }

    render() {
        return (
            <BaseContainer hasHeader={false}>
                <MineTable 
                    onInfoPress={this._onInfoPress}
                    onItemPress={this._onItemPress}
                />
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    
});