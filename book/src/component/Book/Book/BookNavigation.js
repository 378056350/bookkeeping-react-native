import React, { Component } from 'react';
import {
    View,
    Text,
    Animated,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default class BookNavigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    touchComponent = ()=>{
        var arr = []
        for (let i=1; i<=2; i++) {
            arr.push (
                <TouchableOpacity activeOpacity={0.9} style={styles.textTouch} key={i}>
                    <Text style={styles.text}>{i == 1 ? '支出' : '收入'}</Text>
                </TouchableOpacity>
            )
        }
        return arr
    }

    show = (index)=>{
        
    }

    render() {
        return (
            <View style={styles.container}>
                {this.touchComponent()}
                <Animated.View style={styles.line}/>
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
        left: countcoordinatesX(20),
        borderTopLeftRadius: countcoordinatesX(2),
        borderTopRightRadius: countcoordinatesX(2),
        borderBottomLeftRadius: countcoordinatesX(2),
        borderBottomRightRadius: countcoordinatesX(2),
        backgroundColor: kColor_Text_Black,
    }
});