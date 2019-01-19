import React, { Component } from 'react';
import {
    View,
    Easing,
    Animated,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import ChartHUDCell from './ChartHUDCell'

export default class ChartHUD extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            isAnimation: false,
            topAnim: new Animated.Value(-countcoordinatesX(180)),
            opacityAnim: new Animated.Value(0),
        }
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if (this.state.isShow != nextState.isShow) {
            return true
        }
        else if (this.state.isAnimation != nextState.isAnimation) {
            return false
        }
        return true
    }
    
    // 显示/隐藏 
    _switchAnimation = ()=>{
        this.setState({isAnimation: true})
        Animated.parallel([   
            Animated.timing(this.state.opacityAnim,{ 
                duration: 200,
                easing: Easing.elastic(0),
                toValue: this.state.isShow == false ? 1 : 0
            }),
            Animated.timing(this.state.topAnim,{ 
                duration: 200,
                easing: Easing.elastic(0),
                toValue: this.state.isShow == false ? 0 : -countcoordinatesX(180)
            })
        ]).start((result)=>{
            this.setState({
                isShow: this.state.isShow == true ? false : true,
                isAnimation: false,
            })
        })
    }

    // 点击
    _onPress = (index)=>{
        this._switchAnimation()
        this.props.onPress(index)
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    onPress={this._switchAnimation} 
                    activeOpacity={1.0} 
                    disabled={this.state.isShow == false ? true : false}
                    style={styles.shadowOpacity}
                >
                    <Animated.View style={[styles.shadow, {opacity: this.state.opacityAnim}]}/>
                </TouchableOpacity>
                <Animated.View style={[styles.item, {top: this.state.topAnim}]}>
                    <ChartHUDCell 
                        index={0} 
                        check={this.props.navigationIndex == 0} 
                        onPress={this._onPress}
                        style={styles.cell}
                    />
                    <ChartHUDCell 
                        index={1} 
                        check={this.props.navigationIndex == 1} 
                        onPress={this._onPress}
                        style={styles.cell}
                    />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: NAVIGATION_HEIGHT + countcoordinatesX(80),
        bottom: 0,
        overflow: 'hidden'
    },
    shadowOpacity: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    shadow: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    item: {
        width: SCREEN_WIDTH,
        height: countcoordinatesX(180),
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
    },
    cell: {
        height: countcoordinatesX(90),
        width: SCREEN_WIDTH,
    },
});