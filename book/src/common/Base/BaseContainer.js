import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StatusBar,
    StyleSheet
} from 'react-native';
import Navigation from '~/common/Navigation/Navigation'


export default class BaseContainer extends Component {

    _onBackPress = ()=>{
        this.props.navigation.goBack();
    }

    _statusBar = ()=>{
        return (
            <StatusBar 
                translucent={false} 
                backgroundColor={this.props.statusColor} 
                barStyle="dark-content"
            />
        )
    }

    render() {
        return (
            <View style={[styles.container, {...this.props.style}]}>
                {this._statusBar()}
                {this.props.hasHeader && <Navigation {...this.props} onBackPress={this._onBackPress}/>}
                {this.props.children}
            </View>
        );
    }
}

BaseContainer.propTypes = {
    onBackPress: PropTypes.func.isRequired,     // 点击返回
    hasHeader: PropTypes.bool.isRequired,       // 是否有导航栏
    title: PropTypes.string.isRequired,         // 导航栏文字
    statusColor: PropTypes.string.isRequired,   // 状态栏颜色
}
BaseContainer.defaultProps = {
    onBackPress: ()=>{},
    hasHeader: true,
    title: '',
    statusColor: kColor_Main_Color,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
});
