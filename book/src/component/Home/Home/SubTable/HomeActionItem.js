import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    View,
	Text,
	TouchableHighlight,
    StyleSheet
} from 'react-native';

export default class HomeActionItem extends PureComponent {

    render() {
        return (
            <View style={styles.rowBack}>
				<TouchableHighlight 
					underlayColor={kColor_Red_Dark_Color} 
					style={styles.backRightBtn} 
					onPress={this.props.onActionPress}
				>
                    <Text style={styles.backTextWhite}>{'删除'}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}


HomeActionItem.propTypes = {
    onClosePress: PropTypes.func.isRequired,
    onDeletePress: PropTypes.func.isRequired,
}
HomeActionItem.defaultProps = {
    onClosePress: ()=>{},
    onDeletePress: ()=>{},
};


const styles = StyleSheet.create({
    rowBack: {
		alignItems: 'center',
		backgroundColor: 'white',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75,
		right: 0,
		backgroundColor: kColor_Red_Color
	},
	backTextWhite: {
		fontSize: FONT_SIZE(14),
		fontWeight: '400',
		color: 'white',
	}
});