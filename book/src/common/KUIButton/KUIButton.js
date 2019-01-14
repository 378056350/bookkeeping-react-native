import React, { Component } from 'react';
import {
    View,
    Text,
    
    StyleSheet
} from 'react-native';

export default class KUIButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigationIndex: 0
        }
    }

    render() {
        return (
            <View style={styles.container}>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: kColor_Main_Color,
        borderRadius: 3,
    }
});