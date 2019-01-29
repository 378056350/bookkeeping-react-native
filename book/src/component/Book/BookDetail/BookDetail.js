import React, { Component } from 'react';
import {
    DeviceEventEmitter,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import BookHeader from './BookHeader'
import BookTable from './BookTable'
import BookBottom from './BookBottom'
import BDRightItem from './BDRightItem'
import DeviceStorage from '~/utils/DeviceStorage'


export default class BookDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            model: null
        };
    }

    componentDidMount = () => {
        DeviceEventEmitter.addListener(EVENT.REPLACE_BOOK_EVENT, this.getData);
        this.getData(this.props.navigation.state.params.model)
    };


    componentWillUnmount = () => {
        DeviceEventEmitter.removeListener(EVENT.REPLACE_BOOK_EVENT, this.getData)
    }

    getData = (model)=>{
        this.refs.table.setModel(model)
        this.setState({
            model: model
        })
    }
    

    _hasContentRight = ()=>{
        return (
            <BDRightItem onPress={()=>{}}/>
        )
    }

    // 编辑
    _onEditPress = ()=>{
        const { navigation } = this.props
        navigation.navigate('Book', {'model': navigation.state.params.model})
    }

    // 删除
    _onRemovePress = async ()=>{
        const { params } = this.props.navigation.state
        await DeviceStorage.removeBook(params.model)
        DeviceEventEmitter.emit(EVENT.REMOVE_BOOK_EVENT)
        setTimeout(() => {
            this.props.navigation.goBack()
        }, 0);
    }

    render() {
        const { params } = this.props.navigation.state
        return (
            <BaseContainer 
                navigation={this.props.navigation} 
                hasTitle={false} 
                hasRight={true}
                hasContentRight={this._hasContentRight}
            >
                <BookHeader model={this.state.model ? this.state.model : params.model}/>
                <BookTable ref={'table'}/>
                <BookBottom 
                    onEditPress={this._onEditPress} 
                    onRemovePress={this._onRemovePress}
                />
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    
});