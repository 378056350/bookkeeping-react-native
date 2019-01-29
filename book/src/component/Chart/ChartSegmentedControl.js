import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab'

export default class ChartSegmentedControl extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <SegmentedControlTab
                    values={['周', '月', '年']}
                    selectedIndex={this.props.dateIndex}
                    tabStyle={{backgroundColor: kColor_Main_Color}}
                    activeTabStyle={{backgroundColor: kColor_Text_Black}}
                    tabTextStyle={{color: kColor_Text_Black}}
                    activeTabTextStyle={{color: kColor_Main_Color}}
                    tabStyle={{borderColor: kColor_Text_Black, backgroundColor: 'transparent'}}
                    onTabPress={this.props.onPress}
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
        paddingBottom: countcoordinatesX(10), 
    }
});