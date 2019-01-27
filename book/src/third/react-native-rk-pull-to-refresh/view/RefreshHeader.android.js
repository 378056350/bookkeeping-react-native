/**
 * 作者：请叫我百米冲刺 on 2018/1/2 下午1:36
 * 邮箱：mail@hezhilin.cc
 */
'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {requireNativeComponent, View} from 'react-native';

const RefreshHeader = requireNativeComponent('RCTRefreshHeader', AndroidRefreshHeader)

export default class AndroidRefreshHeader extends Component {

    static propTypes = {
        onPushingState: PropTypes.func, //下拉状态的回调
        viewHeight: PropTypes.number, //这里得宁外指定控件的高度，否则不起效果
        ...View.propTypes
    }

    render() {
        return (
            <RefreshHeader {...this.props} viewHeight={this.props.viewHeight}/>
        )
    }
}
