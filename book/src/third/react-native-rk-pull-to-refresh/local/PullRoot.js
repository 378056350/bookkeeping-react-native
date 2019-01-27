/**
 * 作者：请叫我百米冲刺 on 2018/1/5 上午9:19
 * 邮箱：mail@hezhilin.cc
 */
'use strict';
import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import {ActivityIndicator, Text, StyleSheet, View} from 'react-native'
import * as index from './info';

export default class PullRoot extends PureComponent {

    static propTypes = {
        refreshable: PropTypes.bool,
        isContentScroll: PropTypes.bool,
        onPullRelease: PropTypes.func,   //下拉刷新的回调
        onPushing: PropTypes.func,  //此时正在下拉刷新，通知外界

        topIndicatorRender: PropTypes.func, //下拉刷新的render
        topIndicatorHeight: PropTypes.number, //头部的高度
        onPullStateChangeHeight: PropTypes.func //状态的回调
    }

    static defaultProps = {
        refreshable: true,     //是否需要下拉刷新
        isContentScroll: false //内容是否需要跟着滚动，默认为false
    };

    renderTopIndicator = () => {
        if (this.props.topIndicatorRender == null) {
            return this.defaultTopIndicatorRender();
        } else {
            return this.props.topIndicatorRender();
        }
    }

    defaultTopIndicatorRender = () => {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: index.defaultTopIndicatorHeight}}>

                {/**<ActivityIndicator size="small" color="gray" style={{marginRight: 5}}/> */}

                <Text ref={(c) => this.txtPulling = c} style={[styles.hide, this.props.hideStyle]}>{this.props.pulling ? this.props.pulling : index.pulling}</Text>

                <Text ref={(c) => this.txtPullok = c} style={[styles.hide, this.props.hideStyle]}>{this.props.pullok ? this.props.pullok : index.pullok}</Text>

                <Text ref={(c) => this.txtPullrelease = c} style={[styles.hide, this.props.hideStyle]}>{this.props.pullrelease ? this.props.pullrelease : index.pullrelease}</Text>
            </View>
        );
    }


    defaultTopSetting = () => {
        if (this.props.topIndicatorRender == null) { //没有就自己来
            if (this.pullState == "pulling") {
                this.txtPulling && this.txtPulling.setNativeProps({style: styles.show});
                this.txtPullok && this.txtPullok.setNativeProps({style: styles.hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.hide});
            } else if (this.pullState == "pullok") {
                this.txtPulling && this.txtPulling.setNativeProps({style: styles.hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: styles.show});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.hide});
            } else if (this.pullState == "pullrelease") {
                this.txtPulling && this.txtPulling.setNativeProps({style: styles.hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: styles.hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.show});
            }
        }
    }
}

const styles = StyleSheet.create({
    hide: {
        position: 'absolute',
        left: 10000,
        backgroundColor: 'transparent'
    },
    show: {
        position: 'relative',
        left: 0,
        backgroundColor: 'transparent'
    }
});

