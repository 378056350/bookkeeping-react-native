import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Switch,
    TouchableHighlight,
    StyleSheet
} from 'react-native';


export default class MineCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDetail: true
        }
    }

    name = ()=>{
        return (
            <View style={styles.contentLeft}>
                <Image resizeMode={'contain'} source={this.props.data.icon} style={styles.icon}/>
                <Text style={styles.name}>{this.props.data.name}</Text>
            </View>
        )
    }
    detail = ()=>{
        return (
            <View style={styles.contentRight}>
                <Text style={styles.detail}>asdasd</Text>
                <Image resizeMode={'contain'} source={require('~/assets/image/ad_arrow.png')} style={styles.next}/>
            </View>
        )
    }
    switch = ()=>{
        return (
            <Switch trackColor={kColor_Main_Color}/>
        )
    }

    render() {
        return (
            <TouchableHighlight disabled={false} underlayColor={kColor_Text_Gray} onPress={()=>{}}>
                <View style={styles.container}>
                    {this.name()}
                    {this.state.isDetail && this.detail()}
                    {!this.state.isDetail && this.switch()}
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: countcoordinatesX(80),
        backgroundColor: 'white',
        paddingLeft: countcoordinatesX(30),
        paddingRight: countcoordinatesX(30),
    },
    contentLeft: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentRight: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: countcoordinatesX(35),
        height: countcoordinatesX(35),
    },
    name: {
        fontSize: FONT_SIZE(12),
        color: kColor_Text_Black,
        fontWeight: '300',
        marginLeft: countcoordinatesX(20),
    },
    detail: {
        fontSize: FONT_SIZE(12),
        color: kColor_Text_Black,
        fontWeight: '300',
        marginRight: countcoordinatesX(10),
    },
    next: {
        width: countcoordinatesX(30),
        height: countcoordinatesX(30),
    },
});