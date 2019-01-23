import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import ACateGlobal from './ACateGlobal'
import ACHeader from './ACHeader'
import ACTable from './ACTable'


export default class ACate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choose: {section: 0, row: 0}
        }
    }

    // 点击item
    _onPress = (row, section)=>{
        this.setState({choose: {section: section, row: row}})
    }
    // 完成
    _onComplete = ()=>{

    }


    // 完成
    hasContentRight = ()=>{
        return (
            <TouchableOpacity 
                activeOpacity={0.9} 
                onPress={this._onComplete} 
                style={styles.confirmTouch}
            >
                <Text style={styles.confirm}>完成</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <BaseContainer 
                navigation={this.props.navigation} 
                title={'添加支出类别'}
                hasRight={true}
                hasContentRight={this.hasContentRight}
            >
                <ACHeader choose={this.state.choose}/>
                <ACTable onPress={this._onPress} choose={this.state.choose}/>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    confirmTouch: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        paddingLeft: countcoordinatesX(30),
        paddingRight: countcoordinatesX(30),
    },
    confirm: {
        fontSize: FONT_SIZE(14),
        fontWeight: '400',
        color: kColor_Text_Black,
    },
});