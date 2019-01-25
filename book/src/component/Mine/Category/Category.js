import React, { Component } from 'react';
import {
    View,
    Text,
    Animated,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import CHeader from './CHeader'
import CTable from './CTable'
import CButton from './CButton'
import DeviceStorage from '~/utils/DeviceStorage'


export default class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            models: [[],[]],
            handleIndexChange: 0,
        };
    }

    componentDidMount() {
        DeviceStorage.getCategorySet().then((models)=>{
            this.setState({
                models: models
            })
        })
    }

    _onButtonPress = ()=>{
        this.props.navigation.navigate('ACate')
    }

    render() {
        return (
            <BaseContainer 
                navigation={this.props.navigation} 
                title={'类别设置'}
            >
                <CHeader 
                    onTabPress={(index)=>{this.setState({handleIndexChange: index})}} 
                    handleIndexChange={this.state.handleIndexChange}
                />
                <CTable 
                    models={this.state.models}
                    handleIndexChange={this.state.handleIndexChange}
                />
                <CButton onPress={this._onButtonPress}/>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    
});
