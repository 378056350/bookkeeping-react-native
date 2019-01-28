import React, { Component } from 'react';
import {
    Text,
    DeviceEventEmitter,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import BookHeader from './BookHeader'
import BookTable from './BookTable'
import BookBottom from './BookBottom'
import BDRightItem from './BDRightItem'
import DeviceStorage, {SAVE} from '~/utils/DeviceStorage'


export default class BookDetail extends Component {


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
                <BookHeader model={params.model}/>
                <BookTable model={params.model}/>
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