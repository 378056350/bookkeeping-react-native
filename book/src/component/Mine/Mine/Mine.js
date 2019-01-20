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
            // this.props.navigation.navigate('Book');
        } else if (section == 1) {
            if (row == 0) {
                this.props.navigation.navigate('Category');
            }
            else if (row == 1) {
                this.props.navigation.navigate('Timing');
            }
        } else if (section == 2) {
            if (row == 0) {

            } 
            else if (row == 1) {
                
            }
            else if (row == 2) {
                
            }
            else if (row == 3) {
                
            }
            else if (row == 4) {
                this.props.navigation.navigate('About');
            }
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