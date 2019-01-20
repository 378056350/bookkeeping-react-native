import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import BookNavigation from '~/component/Book/Book/BookNavigation'
import BookScroll from '~/component/Book/Book/BookScroll'


export default class Book extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navigationIndex: 0,
        };
    }

    _hasContentRight = ()=>{
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

    _hasTitleComponent = ()=>{
        return (
            <BookNavigation/>
        )
    }

    render() {
        return (
            <BaseContainer 
                navigation={this.props.navigation} 
                hasBack={false}
                hasRight={true}
                hasTitle={false}
                hasContentRight={this._hasContentRight}
                hasTitleComponent={this._hasTitleComponent}
            >
                <BookScroll navigationIndex={this.state.navigationIndex}/>
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