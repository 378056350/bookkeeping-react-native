import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet
} from 'react-native';
// Utils
import Svg,{
    Circle,
    Text,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop,
    TSpan
} from 'react-native-svg';


const chartX = countcoordinatesX(30)
const chartW = (SCREEN_WIDTH - chartX * 2)
const chartH = countcoordinatesX(180)
const titleH = countcoordinatesX(40)
const pointL = countcoordinatesX(1)
const pointR = countcoordinatesX(5)
const pointW = (pointR + pointL / 2)
const chartCount = 7
const pointPadding = (chartW - pointW * chartCount - pointW) / (chartCount - 1)
const pointLeft = (index)=>{
    return pointW + pointPadding * index + pointW * index
}
const textLeft = (index)=>{
    if (index == 0) {
        return pointLeft(index) - pointW
    }
    else if (index == (chartCount - 1)) {
        return pointLeft(index) + pointW
    }
    return pointLeft(index)
}
const textAnchor = (index)=>{
    if (index == 0) {
        return "start"
    } else if (index == (chartCount - 1)) {
        return "end"
    } else {
        return "middle"
    }
}


export default class CTSvg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSelect: -1,
        }
    }

    // 默认两条线
    defaultLine() {
        var arr = [];
        arr.push(
            <Line
                key={0}
                x1={0+""}
                y1={0+""}
                x2={chartW+""}
                y2={0+""}
                stroke={this.props.lineColor}
                strokeWidth={countcoordinatesX(1)+""}
            />
        )
        arr.push(
            <Line
                key={2}
                x1={0+""}
                y1={chartH+""}
                x2={chartW+""}
                y2={chartH+""}
                stroke={this.props.lineColor}
                strokeWidth={countcoordinatesX(1)+""}
            />
        )    
        return arr;
    }
    // 原点
    circle = ()=>{
        var arr = []
        for (var i=0; i<chartCount; i++) {
            arr.push(
                <Circle
                    key={i}
                    cx={pointLeft(i) + ""}
                    cy={chartH+""}
                    r={pointR+""}
                    fill={this.props.chooseColor}
                    stroke={kColor_Three_Color}
                    strokeWidth={pointL+""}
                />
            )
        }
        return arr
    }
    // 折线
    polyline = ()=>{
        var arr = []
        for (var i=0; i<chartCount; i++) {
            const x1 = chartW / chartCount * i
            const x2 = chartW / chartCount * (i + 1)
            arr.push(
                <Line
                    key={i}
                    x1={x1+""}
                    y1={i * 20+""}
                    x2={x2+""}
                    y2={20+""}
                    stroke={this.props.lineColor}
                    strokeWidth={countcoordinatesX(1)+""}
                />
            )
        }
        return arr
    }
    // 文字
    text = ()=>{
        var arr = []
        for (var i=0; i<chartCount; i++) {
            arr.push (
                <Text
                    key={i}
                    fill={kColor_Text_Black}
                    fontSize={FONT_SIZE(8) + ""}
                    fontFamily={"Helvetica Neue"}
                    fontWeight={"300"}
                    x={textLeft(i)}
                    y={(chartH + 13)+""}
                    textAnchor={textAnchor(i)}
                >
                    哈哈哈哈
                </Text>
            )
        }
        return arr
    }
    render() {
        return (
            <View style={styles.container}>
                <Svg
                    width={SCREEN_WIDTH+""}
                    height={"100"}
                    fill={'#000'}
                >
                    {this.defaultLine()}
                    {this.circle()}
                    {this.polyline()}
                    {this.text()}
                </Svg>
            </View>
        );
    }
}


CTSvg.propTypes = {
    normalColor: PropTypes.string.isRequired,
    chooseColor: PropTypes.string.isRequired,
    lineColor: PropTypes.string.isRequired,
}
CTSvg.defaultProps = {
    chooseColor: kColor_Main_Color,
    normalColor: 'white',
    lineColor: kColor_Three_Color
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: chartH + titleH,
    }
});