import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    View,
	Text,
	TouchableHighlight,
    StyleSheet
} from 'react-native';

export default class CActionItem extends PureComponent {

    render() {
        return (
            <View style={styles.rowBack}>
				<TouchableHighlight 
					underlayColor={kColor_Red_Dark_Color} 
					style={[styles.backRightBtn, styles.backRightBtnRight]} 
					onPress={this.props.onDeletePress}
				>
                    <Text style={styles.backTextWhite}>删除</Text>
                </TouchableHighlight>
            </View>
        );
    }
}


CActionItem.propTypes = {
    onClosePress: PropTypes.func.isRequired,
    onDeletePress: PropTypes.func.isRequired,
}
CActionItem.defaultProps = {
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
		width: 75
	},
	backRightBtnRight: {
		backgroundColor: kColor_Red_Color,
		right: 0
	},
	backTextWhite: {
		fontSize: FONT_SIZE(14),
		fontWeight: '400',
		color: 'white',
	}
});