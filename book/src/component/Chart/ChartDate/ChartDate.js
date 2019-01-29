import React, { Component } from 'react';
import {
    View,
    Animated,
    Easing,
    UIManager,
    findNodeHandle,
    ScrollView,
    StyleSheet
} from 'react-native';
import ChartDateCell from './ChartDateCell'
import DeviceStorage from '~/utils/DeviceStorage'

const count = 20
export default class ChartDate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leftAnim: new Animated.Value(countcoordinatesX(50))
        }
    }

    componentDidMount = () => {
        
    }

    // 点击
    _onPress = (index)=>{
        setTimeout(() => {
            // 滚动
            UIManager.measure(findNodeHandle(this.refs['item'+index]),(x, y, itemW)=>{
                const itemX = index * itemW
                const scrollW = this.scrollLayout.width
                const screenX = (SCREEN_WIDTH - itemW) / 2
                var offsetX = itemX - screenX
                offsetX = scrollW > (offsetX + screenX * 2 + itemW) ? offsetX : scrollW - SCREEN_WIDTH
                offsetX = offsetX < 0 ? 0 : offsetX
                this.refs.scroll.scrollTo({ x: offsetX, y: 0, animated: true })
            })
        }, 0);
        // 动画
        Animated.timing(this.state.leftAnim,{ 
            duration: 300,
            easing: Easing.elastic(0),
            toValue: countcoordinatesX(200) * index + countcoordinatesX(50)
        }).start(()=>{
            
        })
    }

    subitem = ()=>{
        var arr = []
        for (let i=0; i<this.props.dates.length; i++) {
            arr.push(
                <ChartDateCell 
                    key={i} 
                    ref={'item'+i} 
                    name={this.props.dates[i]}
                    // onPress={()=>this.props.onPress(i, true)} 
                    onPress={()=>this.props.onPress(i)}
                    choose={i == this.props.subdateIndex}
                />
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
                    <View 
                        style={styles.content}  
                        ref={'scrollContent'}
                        onLayout={(e) => this.scrollLayout= e.nativeEvent.layout}
                    >
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