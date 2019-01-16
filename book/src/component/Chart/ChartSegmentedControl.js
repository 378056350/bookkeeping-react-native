import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab'

export default class ChartSegmentedControl extends Component {
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
                    values={['周', '月', '年']}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.handleIndexChange}
                    tabStyle={{backgroundColor: kColor_Main_Color}}
                    activeTabStyle={{backgroundColor: kColor_Text_Black}}
                    tabTextStyle={{color: kColor_Text_Black}}
                    activeTabTextStyle={{color: kColor_Main_Color}}
                    tabStyle={{borderColor: kColor_Text_Black, backgroundColor: 'transparent'}}
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
        height: countcoordinatesX(80),
        backgroundColor: kColor_Main_Color,
        paddingLeft: countcoordinatesX(30),
        paddingRight: countcoordinatesX(30), 
    }
});