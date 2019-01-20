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

export default class Book extends Component {

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

    _renderItem = (item)=>{
        return <Text style={styles.item}>asdasdasd</Text>
    }

    scrollItem = ()=>{
        var array = []
        var subarray = []
        for (let i=1; i<=2; i++) {
            for (let y=1; y<=19; y++) {
                subarray.push(<View key={y+i*19} style={[styles.item, {backgroundColor: 'orange'}]}/>)
            }
            array.push (
                <ScrollView 
                    key={i}
                    style={{width: SCREEN_WIDTH}}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.list}>
                        {subarray}
                    </View>
                </ScrollView>
            )
        }
        return array
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
                <ScrollView 
                    horizontal={true} 
                    pagingEnabled={true}
                    style={styles.scroll}
                    showsHorizontalScrollIndicator={false}
                >
                    {this.scrollItem()}
                </ScrollView>
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
    scroll: {
        flex: 1,
        backgroundColor: 'red',
    },
    list: {
        flexDirection: 'row',
        width: SCREEN_WIDTH,
        flex: 1,
        backgroundColor: 'green',
        flexWrap: 'wrap',
    },
    item: {
        width: SCREEN_WIDTH / 4,
        height: SCREEN_WIDTH / 4,
    }
});