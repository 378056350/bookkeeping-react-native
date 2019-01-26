import React, { Component } from 'react';
import {
    View,
    DeviceEventEmitter,
    StyleSheet
} from 'react-native';
import HomeGlobal from './HomeGlobal'
import BaseContainer from '~/common/Base/BaseContainer'
import HomeNavigation from './HomeNavigation'
import HomeHeader from './HomeHeader'
import HomeTable from './Table/HomeTable'
import DeviceStorage, {SAVE} from '~/utils/DeviceStorage'


export default class Home extends Component {

    constructor(props) {
        const date = new Date()
        super(props);
        this.state = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            models: [],
        };
    }

    componentDidMount = async () => {
        DeviceStorage.initialization()
        DeviceEventEmitter.addListener(EVENT.ADD_BOOK_EVENT, this.getData);
        this.getData()
    }

    componentWillUnmount = () => {
        DeviceEventEmitter.removeListener(EVENT.ADD_BOOK_EVENT, this.getData)
    }

    getData = async ()=>{
        var models = await DeviceStorage.getBook(this.state.year, this.state.month)
        this.setState({
            models: models
        })
    }

    _onChangeDate = (year, month)=>{
        console.log("===================================");
        
        this.setState({
            year: year,
            month: month
        })
        setTimeout(() => {
            DeviceEventEmitter.emit(EVENT.ADD_BOOK_EVENT, {});
        }, 0);
    }
    
    // 导航栏
    hasTitleComponent = ()=>{
        return (
            <HomeNavigation/>
        )
    }

    render() {
        return (
            <BaseContainer 
                navigation={this.props.navigation} 
                hasLeft={true}
                hasTitle={false} 
                hasTitleComponent={this.hasTitleComponent}
            >
                <HomeHeader 
                    year={this.state.year}
                    month={this.state.month}
                    models={this.state.models}
                    onChangeDate={this._onChangeDate}
                />
                <HomeTable models={this.state.models}/>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    
});