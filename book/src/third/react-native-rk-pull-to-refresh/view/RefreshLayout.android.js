/**
 * 作者：请叫我百米冲刺 on 2018/1/2 下午12:57
 * 邮箱：mail@hezhilin.cc
 */
'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {requireNativeComponent, View, UIManager, findNodeHandle} from 'react-native';

const RefreshLayout = requireNativeComponent('RCTRefreshView', AndroidRefreshLayout)

export default class AndroidRefreshLayout extends Component {

    static propTypes = {
        refreshable: PropTypes.bool,
        isContentScroll: PropTypes.bool,
        ...View.propTypes
    }

    render() {
        return (
            <RefreshLayout
                ref={(c) => this.refresh = c}  {...this.props}>
                {this.props.children}
            </RefreshLayout>
        )
    }

    getRefreshLayoutHandle = () => {
        return findNodeHandle(this.refresh);
    }

    finishRefresh = () => {
        UIManager.dispatchViewManagerCommand(
            this.getRefreshLayoutHandle(),
            UIManager.RCTRefreshView.Commands.finishRefresh,
            null
        );
    }

    startRefresh = () => {
        UIManager.dispatchViewManagerCommand(
            this.getRefreshLayoutHandle(),
            UIManager.RCTRefreshView.Commands.startRefresh,
            null
        );
    }
}
