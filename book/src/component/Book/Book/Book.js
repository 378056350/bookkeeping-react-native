import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'

export default class Book extends Component {


    _hasContentRight = ()=>{
        const { goBack } = this.props.navigation;
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={()=>goBack()} style={styles.cancleTouch}>
                <Text style={styles.cancle}>取消</Text>
            </TouchableOpacity>
        )
    }

    _hasTitleComponent = ()=>{
        return (
            <Text>AAAA</Text>
        )
    }

    _renderItem = (item)=>{
        return <Text style={styles.item}>asdasdasd</Text>
    }

    render() {
        return (
            <BaseContainer 
                hasBack={false}
                hasRight={true}
                hasTitle={false}
                hasContentRight={this._hasContentRight()}
                hasTitleComponent={this._hasTitleComponent}
            >
                <ScrollView 
                    horizontal={true} 
                    pagingEnabled={true}
                    style={styles.scroll}
                    showsHorizontalScrollIndicator={false}
                >
                    <ScrollView style={{width: SCREEN_WIDTH}}>
                        <View 
                            style={styles.list}
                        >
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                            <View style={[styles.item, {backgroundColor: 'rgba(22, 23, 23, 1)'}]}/>
                        </View>
                    </ScrollView>
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