'use strict';

import React from 'react';
import { FlatList } from 'react-native';
import Pullable from '../local/Pullable';

export default class PullListView extends Pullable {

    getScrollable = () => {
        return (
            <FlatList
                ref={(c) => this.scroll = c}
                {...this.props}/>
        );
    }
}
