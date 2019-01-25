import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class CSectionHeader extends PureComponent {

    render() {
        return (
            <View style={styles.container}>
                {this.props.section == 1 && <Text style={styles.name}>更多类别</Text>}
            </View>
        );
    }
}

CSectionHeader.propTypes = {
    section: PropTypes.number.isRequired,
}
CSectionHeader.defaultProps = {
    section: 0,
};

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        backgroundColor: kColor_BG,
        paddingTop: countcoordinatesX(20),
        borderBottomColor: kColor_BG,
        borderBottomWidth: countcoordinatesX(1),
    },
    name: {
        fontSize: FONT_SIZE(12),
        fontWeight: 'normal',
        color: kColor_Text_Gray,
        backgroundColor: 'white',
        paddingLeft: countcoordinatesX(30),
        paddingTop: countcoordinatesX(20),
        paddingBottom: countcoordinatesX(20),
    }
});