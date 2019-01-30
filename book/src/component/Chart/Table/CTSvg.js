import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet
} from 'react-native';
import Svg, {
    Circle,
    Polyline,
    Text,
    Line,
} from 'react-native-svg';


var chartX = countcoordinatesX(30)
var chartW = (SCREEN_WIDTH - chartX * 2)
var chartH = countcoordinatesX(180)
var titleH = countcoordinatesX(40)
var pointL = countcoordinatesX(1)
var pointR = countcoordinatesX(5)
var pointW = (pointR + pointL / 2)


export default class CTSvg extends Component {

    constructor(props) {
        super(props);
        var chartCount = 7
        var pointPadding = (chartW - pointW * chartCount - pointW) / (chartCount - 1)
        var pointLeft = (index)=>{
            return pointW + this.state.pointPadding * index + pointW * index
        }
        var textLeft = (index)=>{
            if (index == 0) {
                return pointLeft(index) - pointW
            }
            else if (index == (chartCount - 1)) {
                return pointLeft(index) + pointW
            }
            return pointLeft(index)
        }
        var textAnchor = (index)=>{
            if (index == 0) {
                return "start"
            } else if (index == (chartCount - 1)) {
                return "end"
            } else {
                return "middle"
            }
        }
        this.state = {
            currentSelect: -1,
            chartCount: chartCount,
            pointPadding: pointPadding,
            pointLeft: pointLeft,
            textLeft: textLeft,
            textAnchor: textAnchor,
        }
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if (nextProps.chartCount != this.props.chartCount) {
            this.setState({
                pointPadding: (chartW - pointW * nextProps.chartCount - pointW) / (nextProps.chartCount - 1),
                pointLeft: (index)=>{
                    return pointW + this.state.pointPadding * index + pointW * index
                },
                textLeft: (index)=>{
                    if (index == 0) {
                        return this.state.pointLeft(index) - pointW
                    }
                    else if (index == (nextProps.chartCount - 1)) {
                        return this.state.pointLeft(index) + pointW
                    }
                    return this.state.pointLeft(index)
                },
                textAnchor: (index)=>{
                    if (index == 0) {
                        return "start"
                    } else if (index == (nextProps.chartCount - 1)) {
                        return "end"
                    } else {
                        return "middle"
                    }
                },
            })
            return false
        }
        return true
    }
    
    // 顶部 + 底部 + 平均线
    defaultLine() {
        const {models} = this.props
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
        // 平均值
        arr.push(
            <Line
                key={3}
                x1={0+""}
                y1={(chartH / models[0].max * (models[0].max - models[0].avg))+""}
                x2={chartW+""}
                y2={(chartH / models[0].max * (models[0].max - models[0].avg))+""}
                stroke={this.props.lineColor}
                strokeWidth={countcoordinatesX(1)+""}
                strokeDasharray={'5'}
            />
        )    
        return arr;
    }
    
    // 原点
    circle = ()=>{
        var arr = []
        for (let i=0; i<this.props.chartCount; i++) {
            const chartMax = this.props.models[0].chartMax
            const data = this.props.models[0].chartData[i]
            arr.push(
                <Circle
                    key={i}
                    cx={this.state.pointLeft(i) + ""}
                    cy={(chartH - (chartH - pointW) / chartMax * data.price)+""}
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
        var points = ''
        for (var i=0; i<this.props.chartCount; i++) {
            const chartMax = this.props.models[0].chartMax
            const data = this.props.models[0].chartData[i]
            const x = this.state.pointLeft(i)
            const y = chartH - (chartH - pointW) / chartMax * data.price
            points += x + ',' + y + ' '
        }
        if (points.length == 0) {
            points = '0,0'
        }
        return (
            <Polyline
                points={points}
                fill="none"
                stroke={this.props.lineColor}
                strokeWidth="1"
            />
        )
    }
    // 文字
    text = ()=>{
        var arr = []
        for (var i=0; i<this.props.chartCount; i++) {
            const data = this.props.models[0].chartData[i]
            // const data = {date: '123'}
            if (data.date.length != 0) {
                arr.push (
                    <Text
                        key={i}
                        fill={kColor_Text_Black}
                        fontSize={FONT_SIZE(10) + ""}
                        fontFamily={"Helvetica Neue"}
                        fontWeight={"300"}
                        x={this.state.textLeft(i)}
                        y={(chartH + 13)+""}
                        textAnchor={this.state.textAnchor(i)}
                    >
                        {data.date}
                    </Text>
                )
            }
        }
        return arr
    }
    // 初始化
    render() {
        return (
            <View style={styles.container}>
                <Svg
                    width={SCREEN_WIDTH+""}
                    height={(chartH + titleH) + ""}
                    fill={'#000'}
                >
                    {this.defaultLine()}
                    {this.polyline()}
                    {this.circle()}
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
    lineColor: kColor_Three_Color,
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: chartH + titleH,
    }
});