import React, { Component } from 'react';
import {
    View,
    ScrollView,
    UIManager,
    findNodeHandle,
    StyleSheet
} from 'react-native';
import BookCell from '~/component/Book/Book/Scroll/BookCell'


export default class BookScroll extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentOffsetY: [0, 0],     // 偏移量
            chooseIndexs: [-1, -1],     // Item选中
        };
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if (nextState.contentOffsetY != this.state.contentOffsetY) {
            return false;
        }
        return true;
    };

    // 横向滚动 - 开始
    _onHorizontalScrollBeginDrag = (e)=>{
        this.setState({
            chooseIndexs: [-1, -1]
        })
        this.props.onScrollBeginDrag()
    }

    // 横向滚动 - 结束
    _onHorizontalMomentumScrollEnd = (e)=>{
        const page = e.nativeEvent.contentOffset.x / SCREEN_WIDTH
        this.props.onMomentumScrollEnd(page)
    }

    // 纵向滚动 - 结束
    _onVerticalMomentumScrollEnd = (e)=>{
        var contentOffsetY = this.state.contentOffsetY
        contentOffsetY[this.props.navigationIndex] = e.nativeEvent.contentOffset.y
        this.setState({...this.state, contentOffsetY: contentOffsetY})
    }

    // 点击Item
    _onItemPress = (index, modal)=>{
        // 记账
        if (modal.id != 999) {
            // 选中item
            var chooseIndexs = this.state.chooseIndexs;
            chooseIndexs[this.props.navigationIndex] = index
            this.setState({
                chooseIndexs: chooseIndexs
            })
            // 滚动
            this.scrollTo(index)
        }
        // 回调
        this.props.onItemPress(index, modal)
    }

    // 滚动到指定行
    scrollTo = (index)=>{
        // Item尺寸
        UIManager.measure(findNodeHandle(this.refs['item'+index]),(x, y, width, itemH, pageX, itemPageY)=>{
            const row = Math.floor(index / 4)
            const itemY = countcoordinatesX(20) + row * itemH
            const currentY = itemPageY - NAVIGATION_HEIGHT
            const currentB = currentY + itemH
            const scrollMinY = itemY - countcoordinatesX(10)
            // Scroll尺寸
            UIManager.measure(findNodeHandle(this.refs['list'+this.props.navigationIndex]),(x, y, width, height, pageX, pageY)=>{
                const listH = SCREEN_HEIGHT - pageY - BOOK_KEYBOARD_H
                const scrollMaxY = itemY - listH + itemH
                const listContentH = this['listLayout' + this.props.navigationIndex].height
                // 内容过短, 不可滚动
                if (listContentH < listH) {
                    return 
                }
                // 不在范围内, 滚动
                if (!(currentY >= 0 && currentB < listH)) {
                    if (currentY < 0) {
                        this.refs['list' + this.props.navigationIndex].scrollTo({x: 0, y: scrollMinY, animated: true})
                    } else {
                        this.refs['list' + this.props.navigationIndex].scrollTo({x: 0, y: scrollMaxY, animated: true})
                    }
                }
            })
        })
    }

    // 获取选中分类
    getChooseModel = ()=>{
        var index = this.state.chooseIndexs[this.props.navigationIndex]
        var model = this.props.models[this.props.navigationIndex][index]
        return model
    }


    // 更新
    shouldComponentUpdate = (nextProps, nextState) => {
        if (nextProps.navigationIndex !== this.props.navigationIndex) {
            this.refs.scroll.scrollTo({x: nextProps.navigationIndex * SCREEN_WIDTH, y: 0, animated: true})
            this.setState({chooseIndexs: [-1, -1]})
            return true
        }
        if (nextState.contentOffsetY !== this.state.contentOffsetY) {
            return false
        }
        return true
    }

    // 滚动控件
    scrollItem = ()=>{
        var array = []
        var index = 0
        for (let i=0; i<this.props.models.length; i++) {
            var subarray = []
            var data = this.props.models[i] ? this.props.models[i] : []
            for (let y=0; y<data.length; y++) {
                subarray.push(
                    <BookCell 
                        ref={'item' + index}
                        key={index++} 
                        choose={this.state.chooseIndexs[i]==y}
                        onPress={(modal)=>this._onItemPress(y, modal)} 
                        model={data[y]}
                    />
                )
            }
            array.push (
                <ScrollView 
                    key={i}
                    ref={'list' + i}
                    style={styles.list}
                    showsVerticalScrollIndicator={false}
                    onScroll={this._onVerticalScroll}
                    onMomentumScrollEnd={this._onVerticalMomentumScrollEnd}
                    onScrollEndDrag={this._onVerticalMomentumScrollEnd}
                >
                    <View style={styles.listContent} onLayout={(e) => this['listLayout' + i] = e.nativeEvent.layout}>
                        {subarray}
                    </View>
                </ScrollView>
            )
        }
        return array
    }
    
    // 初始化
    render() {
        return (
            <ScrollView 
                ref={'scroll'}
                horizontal={true} 
                pagingEnabled={true}
                style={styles.scroll}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={this._onHorizontalMomentumScrollEnd}
                onScrollBeginDrag={this._onHorizontalScrollBeginDrag}
            >
                {this.scrollItem()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        width: SCREEN_WIDTH,
    },
    list: {
        width: SCREEN_WIDTH,
        flexWrap: 'wrap',
    },
    listContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: SCREEN_WIDTH,
        paddingLeft: countcoordinatesX(30),
        paddingTop: countcoordinatesX(20),
        paddingBottom: countcoordinatesX(20),
    },
    item: {
        width: SCREEN_WIDTH / 4,
        height: SCREEN_WIDTH / 4,
    }
});