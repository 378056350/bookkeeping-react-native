import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab'

export default class CHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handleIndexChange: 0,
        }
    }

    _onTabPress = (index)=>{
        this.setState({
            ...this.state,
            selectedIndex: index,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <SegmentedControlTab
                    values={['支出', '收入']}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.handleIndexChange}
                    activeTabStyle={{backgroundColor: kColor_Text_Black}}
                    activeTabTextStyle={{color: kColor_Main_Color}}
                    tabStyle={{backgroundColor: kColor_Main_Color}}
                    tabTextStyle={{color: kColor_Text_Black}}
                    tabStyle={{borderColor: kColor_Text_Black, backgroundColor: 'transparent', height: countcoordinatesX(60)}}
                    onTabPress={this._onTabPress}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: countcoordinatesX(100),
        backgroundColor: kColor_Main_Color,
        paddingLeft: countcoordinatesX(80),
        paddingRight: countcoordinatesX(80), 
    }
});