import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import FDItemBar from '~/component/Find/FindDetail/FDItemBar'
import FDTable from '~/component/Find/FindDetail/FDTable'
import KKDatePicker from '~/common/KKDatePicker/KKDatePicker'
import DeviceStorage from '~/utils/DeviceStorage'


export default class FindDetail extends Component {

    constructor(props) {
        super(props);
        const date = new Date()
        this.state = {
            year: date.getFullYear(),
            models: {'main': {income: 0, pay: 0, data: 0}, 'data': [{ title: "title1", data: [] }]}
        };
    }

    componentDidMount = async () => {
        const date = new Date()
        this.getData(date.getFullYear())
    }
    
    getData = async (year)=>{
        this.setState({
            year: year,
            models: await DeviceStorage.getFindDetail(year)
        })
    }
    
    _onRightPress = ()=>{
        this.refs.picker.show()
    }

    _hasContentRight = ()=>{
        return (
            <FDItemBar onPress={this._onRightPress} year={this.state.year}/>
        )
    }

    // 确认
    _onConfirm = (year)=>{
        this.getData(year)
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
                <FDTable models={this.state.models}/>
                <KKDatePicker ref={'picker'} number={1} onConfirm={this._onConfirm}/>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        
    }
});