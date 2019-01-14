import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import KUILoginField from '~/common/KUILoginField/KUILoginField'
import KUIButton from '~/common/KUIButton/KUIButton'

export default class Register extends Component {
    render() {
        return (
            <View style={styles.container}>
                <KUILoginField style={styles.phone}/>
                <KUIButton/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        backgroundColor: 'white',
    },
    phone: {
        marginLeft: countcoordinatesX(30),
        marginRight: countcoordinatesX(30),
        marginTop: countcoordinatesX(40)
    }
});