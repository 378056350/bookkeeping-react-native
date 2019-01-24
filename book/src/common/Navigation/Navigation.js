import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import NavigationBack from './NavigationBack'


export default class Navigation extends Component {


    title = ()=>{
        return (
            <Text style={styles.title}>{this.props.title}</Text>
        )
    }

    contentLeft = ()=>{
        if (this.props.hasLeft) {
            return (
                <View style={styles.contentLeft}>
                    {this.props.hasContentLeft()}
                </View>
            )
        } else {
            const navigation = this.props.navigation
            if (navigation && navigation.state.params && navigation.state.params['mode'] === 'modal') {
                return <View/>
            } else {
                return <NavigationBack onPress={this.props.onBackPress} style={styles.contentLeft}/>
            }
        }
    }

    contentRight = ()=>{
        if (this.props.hasRight) {
            return (
                <View style={styles.contentRight}>
                    {this.props.hasContentRight()}
                </View>
            )
        } else {
            return <View style={styles.contentRight}/>
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                {this.contentLeft()}
                {this.props.hasTitle && this.title()}
                {!this.props.hasTitle && this.props.hasTitleComponent()}
                {this.contentRight()}
            </View>
        );
    }
}


Navigation.propTypes = {
    hasTitle: PropTypes.bool.isRequired,
    hasLeft:  PropTypes.bool.isRequired,
    hasRight: PropTypes.bool.isRequired,
    onBackPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
}
Navigation.defaultProps = {
    hasTitle: true,
    hasLeft:  false,
    hasRight: false,
    hasContentLeft: ()=>{return(<View/>)},
    hasContentRight: ()=>{return(<View/>)},
    hasTitleComponent: ()=>{return(<View/>)},
    onBackPress: ()=>{},
    title: '',
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: iOS ? NAVIGATION_HEIGHT : NAVIGATION_HEIGHT - STATUS_BAR_HEIGHT,
        paddingTop: iOS ? STATUS_BAR_HEIGHT : 0,
        backgroundColor: kColor_Main_Color,
    },
    title: {
        fontSize: FONT_SIZE(18),
        fontWeight: '400',
        color: kColor_Text_Black,
        letterSpacing: 1,
    },
    contentLeft: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        height: 44,
    },
    contentRight: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        height: 44,
    }
});
