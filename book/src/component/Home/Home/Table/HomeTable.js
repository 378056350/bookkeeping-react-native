import React, { Component } from 'react';
import { 
    View,  
    StyleSheet
} from 'react-native';
import { PullFlatList } from '~/third/react-native-rk-pull-to-refresh'
import HomeSubTable from '~/component/Home/Home/SubTable/HomeSubTable'

const tableH = (SCREEN_HEIGHT - NAVIGATION_HEIGHT - HOME_HEADER_H - STATUS_TABBAR_HEIGHT)
export default class HomeTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
			showFoot: 1
		};
    }
    
    componentDidMount = () => {
      
    }

    _onScrollEndDrag = (e)=>{
        const contentOffsetY = e.nativeEvent.contentOffset.y
        const contentSizeY = e.nativeEvent.contentSize.height < tableH ? tableH : e.nativeEvent.contentSize.height
        const layoutMeasurementY = e.nativeEvent.layoutMeasurement.height
        
        console.log("contentOffsetY: " + contentOffsetY);
        console.log("contentSizeY: " + contentSizeY);
        console.log("layoutMeasurementY: " + layoutMeasurementY);
        

        if ((layoutMeasurementY + contentOffsetY) > (contentSizeY + 44)) {
            this.props.pullUpRefresh()
        }
        
    }

    render() {
        return (
            <View style={styles.container}>
                <PullFlatList
                    ref={(e) => this.list = e}
                    contentInset={{top: 0, left: 0, bottom: 44, right: 0}}
                    onPushing={this.props.onPushing}
                    onPullRelease={this._onPullRelease}
                    showsVerticalScrollIndicator={false}
                    data={[{key: '1'}]}
                    renderItem={this._renderItem}
                    pulling={'下拉查看下月数据'}
                    pullok={'松开可查看下月数据'}
                    pullrelease={'查找数据中'}
                    hideStyle={styles.hide}
                    isContentScroll={true}
                    onScrollEndDrag={this._onScrollEndDrag}
                />
            </View>
        )
    }
    
    _renderItem = ({item, separators})=>{
        return (
            <HomeSubTable 
                models={this.props.models} 
                actionRow={this.props.actionRow}
                onPress={this.props.onPress}
            />
        )
    }

    // 刷新
    _onPullRelease = () => {
        setTimeout(() => {
            this.list && this.list.finishRefresh()
            this.props.pullRefresh()
        }, 0);
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT - NAVIGATION_HEIGHT - HOME_HEADER_H - STATUS_TABBAR_HEIGHT,
    },
    hide: {
        fontSize: FONT_SIZE(12),
        fontWeight: '300',
        color: kColor_Text_Black,
    },
});