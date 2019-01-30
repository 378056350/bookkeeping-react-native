import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    PanResponder,
    StyleSheet
} from 'react-native';
import Svg, {
    Circle,
    Polyline,
    Text,
    Line,
} from 'react-native-svg';
import CTTag from './CTTag'


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
                getCurrentPoint: (offsetX)=>{
                    var minOffsetX = SCREEN_WIDTH
                    var point = 0
                    for (var i=0; i<this.props.chartCount; i++) {
                        var pointOffsetX = chartX + pointW + this.state.pointPadding * i + pointW * i
                        if (minOffsetX > Math.abs(pointOffsetX - offsetX)) {
                            minOffsetX = Math.abs(pointOffsetX - offsetX)
                            point = i
                        }
                    }
                    return point
                }
            })
            return false
        }
        return true
    }
    componentWillMount = ()=>{
        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            // 手势开始
            onPanResponderGrant: (evt, gestureState) => {
              this.onPanMove(gestureState.x0)
            },
            // 手势移动
            onPanResponderMove: (evt, gestureState) => {
              this.onPanMove(gestureState.moveX)
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            // 手势结束
            onPanResponderRelease: (evt, gestureState) => {
              this.onPanStop();
            },
            // 手势终止
            onPanResponderTerminate: (evt, gestureState) => {
              this.onPanStop();
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
              return true;
            },
          });
    }

    onPanMove = (offsetX)=>{
        this.setState({
            currentSelect: this.state.getCurrentPoint(offsetX)
        })
    }
    onPanStop = ()=>{
        this.setState({
            currentSelect: -1
        })
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
            chartMax = chartMax == 0 ? chartH : chartMax
            const data = this.props.models[0].chartData[i]
            arr.push(
                <Circle
                    key={i}
                    cx={this.state.pointLeft(i) + ""}
                    cy={(chartH - (chartH - pointW) / chartMax * data.price)+""}
                    r={pointR+""}
                    fill={i == this.state.currentSelect ? this.props.chooseColor : this.props.normalColor}
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
            if (chartMax != 0) {
                const data = this.props.models[0].chartData[i]
                const x = this.state.pointLeft(i)
                const y = chartH - (chartH - pointW) / chartMax * data.price
                points += x + ',' + y + ' '
            }
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
        const { models } = this.props
        const { currentSelect } = this.state
        var bottom = 0
        if (currentSelect >= 0) {
            const chartMax = models[0].chartMax 
            const data = models[0].chartData[this.state.currentSelect]
            bottom = ((chartH - pointW) / chartMax * data.price)
            bottom += titleH
            bottom += pointW / 2
        }

        return (
            <View 
                style={styles.container}
                {...this._panResponder.panHandlers}
            >
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
                {(this.state.currentSelect != -1) && 
                <CTTag 
                    left={this.state.pointLeft(this.state.currentSelect) - pointW / 2} 
                    bottom={bottom}
                />}
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