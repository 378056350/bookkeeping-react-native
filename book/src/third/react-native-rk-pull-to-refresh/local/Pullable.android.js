/**
 * 作者：请叫我百米冲刺 on 2018/1/2 下午12:50
 * 邮箱：mail@hezhilin.cc
 */
'use strict';
import React from 'react';
import RefreshLayout from '../view/RefreshLayout'
import RefreshHeader from '../view/RefreshHeader'
import PullRoot from './PullRoot'
import * as index from './info';

export default class Pullable extends PullRoot {

    constructor(props) {
        super(props);
        this.pullState = 'pulling'; //pulling,pullok,pullrelease
        this.topIndicatorHeight = this.props.topIndicatorHeight ? this.props.topIndicatorHeight : index.defaultTopIndicatorHeight;
    }

    render() {
        return (
            <RefreshLayout
                {...this.props}
                style={{flex: 1}}
                ref={(c) => this.refresh = c}>

                <RefreshHeader
                    style={{flex: 1, height: this.topIndicatorHeight}}
                    viewHeight={index.dip2px(this.topIndicatorHeight)}
                    onPushingState={(e) => this.onPushingState(e)}>
                    {this.renderTopIndicator()}
                </RefreshHeader>

                {this.getScrollable()}
            </RefreshLayout>
        )
    }


    onPushingState = (event) => {
        let moveHeight = event.nativeEvent.moveHeight
        let state = event.nativeEvent.state
        //因为返回的moveHeight单位是px，所以要将this.topIndicatorHeight转化为px进行计算
        let topHeight = index.dip2px(this.topIndicatorHeight)
        if (moveHeight > 0 && moveHeight < topHeight) { //此时是下拉没有到位的状态
            this.pullState = "pulling"
        } else if (moveHeight >= topHeight) { //下拉刷新到位
            this.pullState = "pullok"
        } else { //下拉刷新释放,此时返回的值为-1
            this.pullState = "pullrelease"
        }
        //此时处于刷新中的状态
        if (state == 3) {
            this.pullState = "pullrelease"
        }
        //默认的设置
        this.defaultTopSetting()
        //告诉外界是否要锁住
        this.props.onPushing && this.props.onPushing(this.pullState != "pullrelease")
        //进行状态和下拉距离的回调
        this.props.onPullStateChangeHeight && this.props.onPullStateChangeHeight(this.pullState, moveHeight)

    }

    finishRefresh = () => {
        this.refresh && this.refresh.finishRefresh()
    }

    startRefresh = () => {
        this.refresh && this.refresh.startRefresh()
    }
}

