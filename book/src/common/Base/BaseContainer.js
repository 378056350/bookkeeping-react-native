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
}
BaseContainer.defaultProps = {
    onBackPress: ()=>{},
    hasHeader: true,
    title: '',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
});
