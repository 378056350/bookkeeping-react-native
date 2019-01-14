import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';

export default class KUILoginField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <View style={[styles.container, {...this.props.style}]}>
                <Text style={styles.names}>qweqeqew</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'hahahaha'}
                    placeholderTextColor={kColor_Text_Gray}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: countcoordinatesX(90),
        borderBottomColor: kColor_BG,
        borderBottomWidth: 1,
    },
    names: {
        marginRight: countcoordinatesX(20),
        fontSize: FONT_SIZE(14),
        fontWeight: 'normal',
        color: kColor_Text_Black,
    },
    input: {
        flex: 1,
        height: countcoordinatesX(90),
        fontSize: FONT_SIZE(14),
        color: kColor_Text_Black,
    }
});