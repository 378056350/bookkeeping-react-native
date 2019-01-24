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
            models: [[[],[]],[[],[]]]
        };

        this.rowSwipeAnimatedValues = {};
		Array(20).fill('').forEach((_, i) => {
			this.rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
		});
    }

    componentDidMount() {
        var models = DeviceStorage.getCategorySet()
        console.log("================================");
        console.log(models);
        
        // this.setState({
        //     models: models
        // })
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
                <CHeader/>
                <CTable models={this.state.models}/>
                <CButton onPress={this._onButtonPress}/>
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