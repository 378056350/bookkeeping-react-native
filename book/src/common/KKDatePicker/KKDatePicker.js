import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Modal,
    Animated, 
    Easing,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import KDContent from './KDContent'


export default class KKDatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <Modal
                animationType="none"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    
                }}
            >
                <View style={styles.container}>
                    <View style={styles.shadow}/>
                    <KDContent number={3}/>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    shadow: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    }
});