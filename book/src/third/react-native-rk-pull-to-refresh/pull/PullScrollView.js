'use strict';
import React from 'react';
import { ScrollView, ListView, View } from 'react-native';
import Pullable from '../local/Pullable';

//ScrollView 暂时没有找到比较好的方法去判断时候滚动到顶部，
//所以这里用ListView配合ScrollView进行使用
export default  class PullScrollView extends Pullable {

    getScrollable=()=> {
        return (
            <ListView
                ref={(c) => {this.scroll = c;}}
                renderRow={this.renderRow}
                dataSource={new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])}
                enableEmptySections={true}
                renderHeader={this._renderHeader}/>
        );
    }

    renderRow = (rowData, sectionID, rowID, highlightRow) => {
        return <View/>
    }

    _renderHeader = () => {
        return (
            <ScrollView
                scrollEnabled={false}>
                {this.props.children}
            </ScrollView>
        )
    }

}



