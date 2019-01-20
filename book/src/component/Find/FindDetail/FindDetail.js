import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import FDItemBar from '~/component/Find/FindDetail/FDItemBar'
import FDTable from '~/component/Find/FindDetail/FDTable'


export default class FindDetail extends Component {


    _onRightPress = ()=>{
        console.log("123123");
        
    }

    _hasContentRight = ()=>{
        return (
            <FDItemBar onPress={this._onRightPress}/>
        )
    }


    render() {
        return (
            <BaseContainer 
                style={styles.container}
                navigation={this.props.navigation} 
                title={'账单'}
                hasRight={true}
                hasContentRight={this._hasContentRight}
            >   
                <FDTable/>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        
    }
});