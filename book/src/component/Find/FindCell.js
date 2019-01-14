import React, { Component } from 'react';
import {
    View,
    Text,
    SectionList,
    StyleSheet
} from 'react-native';

export default class FindCell extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>FindCell</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: countcoordinatesX(200),
    }
});