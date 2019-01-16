import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
const tally_select_right = require('~/assets/image/tally_select_right.png')


export default class ChartHUDCell extends Component {

    check = ()=>{
        return (
            <Image resizeMode={'contain'} source={tally_select_right} style={styles.check}/>
        )
    }
    
    render() {
        return (
            <TouchableHighlight onPress={()=>this.props.onPress(this.props.index)} underlayColor={kColor_BG} style={[styles.container, {...this.props.style}]}>
                <View style={styles.content}>
                    <View style={styles.contentLeft}>
                        <Image resizeMode={'contain'} style={styles.icon}/>
                        <Text style={styles.name}>asdasdas</Text>
                    </View>
                    {this.props.check && this.check()}
                </View>
            </TouchableHighlight>
        );
    }
}

ChartHUDCell.propTypes = {
    check: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
}
ChartHUDCell.defaultProps = {
    check: false,
    onPress: ()=>{}
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: countcoordinatesX(30),
        paddingRight: countcoordinatesX(30),
    },
    contentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: countcoordinatesX(50),
        height: countcoordinatesX(50),
        backgroundColor: 'red',
    },
    name: {
        marginLeft: countcoordinatesX(10),
        fontSize: FONT_SIZE(14),
        color: kColor_Text_Black,
    },
    check: {
        width: countcoordinatesX(30),
        height: countcoordinatesX(30),
    }
});