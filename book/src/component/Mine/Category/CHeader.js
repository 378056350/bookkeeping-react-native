import React, { PureComponent } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab'

export default class CHeader extends PureComponent {

    render() {
        return (
            <View style={styles.container}>
                <SegmentedControlTab
                    values={['支出', '收入']}
                    selectedIndex={this.props.handleIndexChange}
                    onTabPress={this.props.onTabPress}
                    activeTabStyle={{backgroundColor: kColor_Text_Black}}
                    activeTabTextStyle={{color: kColor_Main_Color}}
                    tabStyle={{backgroundColor: kColor_Main_Color}}
                    tabTextStyle={{color: kColor_Text_Black}}
                    tabStyle={{borderColor: kColor_Text_Black, backgroundColor: 'transparent', height: countcoordinatesX(60)}}
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