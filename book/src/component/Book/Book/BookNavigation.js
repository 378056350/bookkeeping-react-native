import React, { Component } from 'react';
import {
    View,
    Text,
    Animated,
    Easing,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default class BookNavigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offsetXAnim: new Animated.Value(countcoordinatesX(20)),
        };
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if (nextProps.navigationIndex != this.props.navigationIndex) {
            this.show(nextProps.navigationIndex)
            return true
        }
        return true
    }

    show = (page)=>{
        Animated.timing(this.state.offsetXAnim,{ 
            duration: 300,
            easing: Easing.elastic(0),
            toValue: countcoordinatesX(20) + page * countcoordinatesX(110)
        }).start((result)=>{
            
        });
    }

    touchComponent = ()=>{
        var arr = []
        for (let i=1; i<=2; i++) {
            let page = i - 1;
            arr.push (
                <TouchableOpacity activeOpacity={0.9} onPress={()=>this.props.onPress(page)} style={styles.textTouch} key={i}>
                    <Text style={styles.text}>{i == 1 ? '支出' : '收入'}</Text>
                </TouchableOpacity>
            )
        }
        return arr
    }

    render() {
        return (
            <View style={styles.container}>
                {this.touchComponent()}
                <Animated.View style={[styles.line, {left: this.state.offsetXAnim}]}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textTouch: {
        justifyContent: 'center',
        alignItems: 'center',
        width: countcoordinatesX(110),
        height: 44,
    },
    text: {
        fontSize: FONT_SIZE(16),
        color: kColor_Text_Black
    },
    line: {
        height: countcoordinatesX(4),
        width: countcoordinatesX(70),
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: countcoordinatesX(2),
        borderTopRightRadius: countcoordinatesX(2),
        borderBottomLeftRadius: countcoordinatesX(2),
        borderBottomRightRadius: countcoordinatesX(2),
        backgroundColor: kColor_Text_Black,
    }
});