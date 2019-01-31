'use strict';

import React from 'react';
import {ListView, View, PanResponder, Animated, Easing, FlatList} from 'react-native';
import * as index from './info';
import PullRoot from './PullRoot'

export default class Pullable extends PullRoot {

    constructor(props) {
        super(props);
        this.pullState = 'pulling'; //pulling,pullok,pullrelease
        this.topIndicatorHeight = this.props.topIndicatorHeight ? this.props.topIndicatorHeight : index.defaultTopIndicatorHeight;
        this.defaultXY = {x: 0, y: this.topIndicatorHeight * -1};
        this.duration = this.props.duration ? this.props.duration : index.defaultDuration;
        this.state = Object.assign({}, props, {
            pullPan: new Animated.ValueXY(this.defaultXY),
            atTop: true,
            height: 0,
            width: 0
        });
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this.onShouldSetPanResponder,
            onStartShouldSetPanResponderCapture: this.onShouldSetPanResponder,
            onMoveShouldSetPanResponder: this.onShouldSetPanResponder,
            onMoveShouldSetPanResponderCapture: this.onShouldSetPanResponder,
            onPanResponderTerminationRequest: (evt, gestureState) => false, //这个很重要，这边不放权
            onPanResponderMove: this.onPanResponderMove,
            onPanResponderRelease: this.onPanResponderRelease,
            onPanResponderTerminate: this.onPanResponderRelease,
        });
    }

    onShouldSetPanResponder = (e, gesture) => {
        let y = 0
        if (this.scroll instanceof ListView) { //ListView下的判断
            y = this.scroll.scrollProperties.offset;
        } else if (this.scroll instanceof FlatList) {//FlatList下的判断
            y = this.scroll._listRef._getScrollMetrics().offset
        }
        //根据y的值来判断是否到达顶部
        this.state.atTop = (y <= 0)
        if (this.state.atTop && index.isDownGesture(gesture.dx, gesture.dy) && this.props.refreshable) {
            this.lastY = this.state.pullPan.y._value;
            return true;
        }
        return false;
    }

    onPanResponderMove = (e, gesture) => {
        if (index.isDownGesture(gesture.dx, gesture.dy) && this.props.refreshable) { //下拉
            this.state.pullPan.setValue({x: this.defaultXY.x, y: this.lastY + gesture.dy / 2});
            this.onPullStateChange(gesture.dy)
        }
    }

    onPanResponderRelease = (e, gesture) => {
        if (this.pullState == 'pulling') { //没有下拉到位
            this.resetDefaultXYHandler(); //重置状态
        } else if (this.pullState == 'pullok') { //已经下拉到位了
            //传入-1，表示此时进行的是释放刷新的操作
            this.onPullStateChange(-1)
            //进行下拉刷新的回调
            this.props.onPullRelease && this.props.onPullRelease();
            //重置刷新的头部到初始位置
            Animated.timing(this.state.pullPan, {
                toValue: {x: 0, y: 0},
                easing: Easing.linear,
                duration: this.duration
            }).start();
        }
    }

    //重置刷新的操作
    resetDefaultXYHandler = () => {
        Animated.timing(this.state.pullPan, {
            toValue: this.defaultXY,
            easing: Easing.linear,
            duration: this.duration
        }).start(() => {
            //ui要进行刷新
            this.onPullStateChange(-1)
        });
    }

    /** 数据加载完成后调用此方法进行重置归位
     */
    finishRefresh = () => {
        if (this.pullState == 'pullrelease') { //仅触摸松开时才触发
            this.resetDefaultXYHandler();
        }
    }

    startRefresh = () => {
        if (!this.props.refreshable) { //不支持下拉刷新的时候就不进行了
            return;
        }
        //进行数据的回调
        this.props.onPullRelease && this.props.onPullRelease();
        //此时进行状态的改变
        this.onPullStateChange(-1)
        //动画的展示
        Animated.timing(this.state.pullPan, {
            toValue: {x: 0, y: 0},
            easing: Easing.linear,
            duration: this.duration
        }).start();
    }

    onLayout = (e) => {
        if (this.state.width != e.nativeEvent.layout.width || this.state.height != e.nativeEvent.layout.height) {
            this.scrollContainer && this.scrollContainer.setNativeProps({
                style: {
                    width: e.nativeEvent.layout.width,
                    height: e.nativeEvent.layout.height
                }
            });
            this.state.width = e.nativeEvent.layout.width;
            this.state.height = e.nativeEvent.layout.height;
        }
    }

    render() {
        return (
            <View style={{flex: 1, flexGrow: 1, zIndex: -999}} {...this.panResponder.panHandlers} onLayout={this.onLayout}>
                {this.props.isContentScroll ?
                    <View pointerEvents='box-none'>
                        <Animated.View style={[this.state.pullPan.getLayout()]}>
                            {this.renderTopIndicator()}
                            <View ref={(c) => {
                                this.scrollContainer = c;
                            }}
                                  style={{width: this.state.width, height: this.state.height}}>
                                {this.getScrollable()}
                            </View>
                        </Animated.View>
                    </View> :

                    <View>
                        <View ref={(c) => {
                            this.scrollContainer = c;
                        }}
                              style={{width: this.state.width, height: this.state.height}}>
                            {this.getScrollable()}
                        </View>
                        <View pointerEvents='box-none'
                              style={{position: 'absolute', left: 0, right: 0, top: 0}}>
                            <Animated.View style={[this.state.pullPan.getLayout()]}>
                                {this.renderTopIndicator()}
                            </Animated.View>
                        </View>
                    </View>}
            </View>
        );
    }

    //下拉的时候根据高度进行对应的操作
    onPullStateChange = (moveHeight) => {
        //因为返回的moveHeight单位是px，所以要将this.topIndicatorHeight转化为px进行计算
        let topHeight = index.dip2px(this.topIndicatorHeight)
        if (moveHeight > 0 && moveHeight < topHeight) { //此时是下拉没有到位的状态
            this.pullState = "pulling"
        } else if (moveHeight >= topHeight) { //下拉刷新到位
            this.pullState = "pullok"
        } else { //下拉刷新释放,此时返回的值为-1
            this.pullState = "pullrelease"
        }
        //默认的设置
        this.defaultTopSetting()
        //告诉外界是否要锁住
        this.props.onPushing && this.props.onPushing(this.pullState != "pullrelease")
        //进行状态和下拉距离的回调
        this.props.onPullStateChangeHeight && this.props.onPullStateChangeHeight(this.pullState, moveHeight)
    }
}