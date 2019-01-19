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
                    {this.props.hasContentLeft}
                </View>
            )
        } else {
            if (this.props.hasBack) {
                return <NavigationBack onPress={this.props.onBackPress} style={styles.contentLeft}/>
            } else {
                return <View style={styles.contentLeft}/>
            }
        }
    }

    contentRight = ()=>{
        if (this.props.hasRight) {
            return (
                <View style={styles.contentRight}>
                    {this.props.hasContentRight}
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
                {this.contentRight()}
            </View>
        );
    }
}


Navigation.propTypes = {
    hasTitle: PropTypes.bool.isRequired,
    hasLeft: PropTypes.bool.isRequired,
    hasRight: PropTypes.bool.isRequired,
    hasBack: PropTypes.bool.isRequired,
    hasContentLeft: PropTypes.element.isRequired,
    hasContentRight: PropTypes.element.isRequired,
    onBackPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
}
Navigation.defaultProps = {
    hasTitle: true,
    hasLeft: false,
    hasRight: false,
    hasBack: true,
    hasContentLeft: <View/>,
    hasContentRight: <View/>,
    onBackPress: ()=>{},
    title: '',
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: NAVIGATION_HEIGHT,
        paddingTop: STATUS_BAR_HEIGHT,
        backgroundColor: kColor_Main_Color,
    },
    title: {
        fontSize: FONT_SIZE(18),
        fontWeight: '600',
        color: kColor_Text_Black
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
