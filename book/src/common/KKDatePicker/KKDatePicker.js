import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Modal,
    TouchableHighlight,
    StyleSheet
} from 'react-native';


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
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    
                }}
            >
                <View style={styles.container}>
                    
                </View>
            </Modal>
        );
    }
}


KKDatePicker.propTypes = {
    disabled: PropTypes.bool.isRequired,
}
KKDatePicker.defaultProps = {
    disabled: false
};


const styles = StyleSheet.create({
    container: {
        marginTop: 22
    }
});