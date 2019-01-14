import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

export default class KUIButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <View style={[styles.container, {...this.props.style}]}>
                <TouchableHighlight 
                    onPress={this.props.onPress} 
                    underlayColor={kColor_Main_Dark_Color} 
                    style={[styles.button, {backgroundColor: this.props.disabled == false ? kColor_Main_Color : kColor_BG}]}
                    disabled={this.props.disabled}
                >
                    <Text style={[styles.name, {color: this.props.disabled == false ? kColor_Text_Black : kColor_Text_Gray}]}>{this.props.name}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

KUIButton.propTypes = {
    disabled: PropTypes.bool.isRequired,
}
KUIButton.defaultProps = {
    disabled: false
};

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH - countcoordinatesX(60),
        height: countcoordinatesX(75),
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: countcoordinatesX(75),
        borderRadius: 3,
    },
    name: {
        fontSize: FONT_SIZE(12),
        fontWeight: '100',
    }
});