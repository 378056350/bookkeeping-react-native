import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet
} from 'react-native';
import Navigation from '~/common/Navigation/Navigation'


export default class BaseContainer extends Component {

    _onBackPress = ()=>{
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={[styles.container, {...this.props.style}]}>
                {this.props.hasHeader && <Navigation {...this.props} onBackPress={this._onBackPress}/>}
                {this.props.children}
            </View>
        );
    }
}

BaseContainer.propTypes = {
    onBackPress: PropTypes.func.isRequired,
    hasHeader: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,

    hasTitle: PropTypes.bool.isRequired,
    hasLeft: PropTypes.bool.isRequired,
    hasRight: PropTypes.bool.isRequired,
    hasBack: PropTypes.bool.isRequired,
    hasContentLeft: PropTypes.element.isRequired,
    hasContentRight: PropTypes.element.isRequired,
    navigation: PropTypes.object,
}
BaseContainer.defaultProps = {
    onBackPress: ()=>{},
    hasHeader: true,
    title: '',

    hasTitle: true,
    hasLeft: false,
    hasRight: false,
    hasBack: true,
    hasContentLeft: <View/>,
    hasContentRight: <View/>,
    navigation: undefined,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
});
