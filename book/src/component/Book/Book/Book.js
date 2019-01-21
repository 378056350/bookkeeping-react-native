import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Global from './BookGlobal'
import BaseContainer from '~/common/Base/BaseContainer'
import BookNavigation from '~/component/Book/Book/BookNavigation'
import BookScroll from '~/component/Book/Book/BookScroll'
import BookKeyboard from '~/component/Book/Book/Keyboard/BookKeyboard'
const cateList = require('~/assets/json/Category.json')


export default class Book extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            navigationIndex: 0,
        };
    }
    
    // 点击完成
    _onNavigationPress = (page)=>{
        this.setState({ navigationIndex: page })
    }

    // 滚动完成
    _onMomentumScrollEnd = (page)=>{
        this.setState({ navigationIndex: page })
    }

    // 点击Item
    _onItemPress = (index)=>{
        this.refs.keyboard._switchAnimation()
    }

    // 取消
    hasContentRight = ()=>{
        const { goBack } = this.props.navigation;
        return (
            <TouchableOpacity 
                activeOpacity={0.9} 
                onPress={()=>{goBack()}} 
                style={styles.cancleTouch}
            >
                <Text style={styles.cancle}>取消</Text>
            </TouchableOpacity>
        )
    }

    // 支出/收入
    hasTitleComponent = ()=>{
        return (
            <BookNavigation 
                ref={(nav) => {this.nav = nav}} 
                onPress={this._onNavigationPress}
                navigationIndex={this.state.navigationIndex}
            />
        )
    }

    render() {
        return (
            <BaseContainer 
                navigation={this.props.navigation} 
                hasBack={false}
                hasRight={true}
                hasTitle={false}
                hasContentRight={this.hasContentRight}
                hasTitleComponent={this.hasTitleComponent}
            >
                <BookScroll 
                    models={cateList}
                    navigationIndex={this.state.navigationIndex}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}
                    onItemPress={this._onItemPress}
                />
                <BookKeyboard ref={'keyboard'}/>
            </BaseContainer>
        );
    }
}


const styles = StyleSheet.create({
    cancleTouch: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        paddingLeft: countcoordinatesX(30),
        paddingRight: countcoordinatesX(30),
    },
    cancle: {
        fontSize: FONT_SIZE(14),
        fontWeight: '400',
        color: kColor_Text_Black,
    },
});