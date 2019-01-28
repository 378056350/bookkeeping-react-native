import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet
} from 'react-native';
import BookCell from './BookCell'
import DateExtension from '~/utils/DateExtension'

export default class BookTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {key: '1', 'name': '类型'}, 
                {key: '2', 'name': '金额'}, 
                {key: '3', 'name': '日期'}, 
                {key: '4', 'name': '备注'}
            ]
        }
    }

    _renderItem = ({item})=>{
        const model = this.props.model
        var str = ''
        if (item.key == '1') {
            str = model.cmodel.is_income == 0 ? '支出' : '收入'
        } else if (item.key == '2') {
            str = model.price
        }  else if (item.key == '3') {
            const date = new Date(model.year, model.month, model.day)
            str = model.year + '年' + model.month + '月' + model.day + '日' + '    ' + DateExtension.week(date)
        }  else if (item.key == '4') {
            str = model.mark.length == 0 ? model.cmodel.name : model.mark
        } 
        return (
            <BookCell name={item.name} detail={str}/>
        )
    }

    _ItemSeparatorComponent = ()=>{
        return (
            <View style={styles.line}/>
        )
    }

    render() {
        return (
            <FlatList
                style={styles.container}
                data={this.state.data}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this._ItemSeparatorComponent}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
    },
    line: {
        width: SCREEN_WIDTH,
        height: countcoordinatesX(1),
        backgroundColor: kColor_BG,
    }
});