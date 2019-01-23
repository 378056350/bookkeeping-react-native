import React, { Component } from 'react';
import {
    View,
    Text,
    Animated,
    Easing,
    UIManager,
    findNodeHandle,
    ScrollView,
    StyleSheet
} from 'react-native';
import ChartDateCell from './ChartDateCell'

const count = 20

export default class ChartDate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            choose: 0,
            leftAnim: new Animated.Value(countcoordinatesX(50))
        }
    }

    // 点击
    _onPress = (index)=>{
        // 设置
        this.setState({choose: index})
        // 滚动

// scrollContent

        UIManager.measure(findNodeHandle(this.refs['item'+index]),(x, y, width, height, pageX, pageY)=>{
            const itemX = x
            const itemW = width
            UIManager.measure(findNodeHandle(this.refs.scrollContent),(x, y, width, height, pageX, pageY)=>{
                const screenX = (SCREEN_WIDTH - itemW) / 2

                var offsetX = itemX - screenX
                offsetX = width > (offsetX + screenX * 2 + itemW) ? offsetX : width - SCREEN_WIDTH
                offsetX = offsetX < 0 ? 0 : offsetX

                this.refs.scroll.scrollTo({x: offsetX, y: 0, animated: true})
            })
        })
        // 动画
        Animated.timing(this.state.leftAnim,{ 
            duration: 300,
            easing: Easing.elastic(0),
            toValue: countcoordinatesX(200) * index + countcoordinatesX(50)
        }).start((result)=>{
          
        });
    }

    subitem = ()=>{
        var arr = []
        for (let i=0; i<=count; i++) {
            arr.push(
                <ChartDateCell key={i} ref={'item'+i} onPress={()=>this._onPress(i)} choose={i == this.state.choose}/>
            )
        }
        return arr
    }
    
    render() {
        return (
            <View style={styles.container}>
                <ScrollView 
                    ref={'scroll'}
                    style={styles.scroll} 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles.content} ref={'scrollContent'}>
                        {this.subitem()}
                    </View>
                    <Animated.View style={[styles.line, {left: this.state.leftAnim}]}/>
                </ScrollView>
            </View>
        );
    }
}

const height = countcoordinatesX(80)
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: height,
        backgroundColor: 'white',
        borderBottomWidth: countcoordinatesX(1),
        borderBottomColor: kColor_Line_Color,
    },
    scroll: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: height,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
    },
    line: {
        position: 'absolute',
        bottom: 0,
        width: countcoordinatesX(100),
        height: countcoordinatesX(3),
        backgroundColor: kColor_Text_Black,
    }
});