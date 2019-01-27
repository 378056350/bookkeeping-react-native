'use strict';
import React from 'react';
import {View} from 'react-native';
import Pullable from '../local/Pullable';

export default class PullView extends Pullable {

    getScrollable = () => {
        return (
            <View ref={(c) => {this.scroll = c;}}
                {...this.props}>
                {this.props.children}
            </View>
        );
    }
}
