import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default class MineTable extends Component {


    bookInfo = ()=>{
        return (
            <View style={styles.book}>
                <View style={styles.bookInfo}>
                    <Text style={styles.bookName}>0</Text>
                    <Text style={styles.bookDetail}>123123</Text>
                </View>
                <View style={styles.bookInfo}>
                    <Text style={styles.bookName}>0</Text>
                    <Text style={styles.bookDetail}>123123</Text>
                </View>
                <View style={styles.bookInfo}>
                    <Text style={styles.bookName}>0</Text>
                    <Text style={styles.bookDetail}>123123</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.punch}/>
                <TouchableOpacity activeOpacity={1.0} onPress={this.props.onInfoPress}>
                    <View style={styles.info}>
                        <Image style={styles.icon}/>
                        <Text style={styles.name}>未登录</Text>
                    </View>
                </TouchableOpacity>
                {this.bookInfo()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH / 2,
        backgroundColor: kColor_Main_Color,
        paddingTop: STATUS_BAR_HEIGHT,
    },
    punch: {
        width: countcoordinatesX(100),
        height: countcoordinatesX(50),
        backgroundColor: 'green',
        alignSelf: 'flex-end',
        marginRight: countcoordinatesX(30),
        marginTop: countcoordinatesX(10),
    },
    info: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
        paddingTop: countcoordinatesX(20),
        paddingBottom: countcoordinatesX(20),
        paddingLeft: countcoordinatesX(30),
        paddingRight: countcoordinatesX(30),
    },
    icon: {
        width: countcoordinatesX(80),
        height: countcoordinatesX(80),
        backgroundColor: 'red',
    },
    name: {
        marginTop: countcoordinatesX(10),
        fontSize: FONT_SIZE(10),
        color: kColor_Text_Black,
        fontWeight: 'normal',
    },
    book: {
        flexDirection: 'row',
        width: SCREEN_WIDTH,
        marginTop: countcoordinatesX(25),
    },
    bookInfo: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH / 3,
    },
    bookName: {
        fontSize: FONT_SIZE(12),
        fontWeight: '300',
        color: kColor_Text_Black,
    },
    bookDetail: {
        fontSize: FONT_SIZE(10),
        fontWeight: '100',
        color: kColor_Text_Black,
    }
});