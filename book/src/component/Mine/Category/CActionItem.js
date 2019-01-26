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
		const { section } = this.props
        return (
            <View style={styles.rowBack}>
				<TouchableHighlight 
					underlayColor={section == 0 ? kColor_Red_Dark_Color : kColor_Green_Dark_Color} 
					style={[styles.backRightBtn,  {'backgroundColor': section == 0 ? kColor_Red_Color : kColor_Green_Color}]} 
					onPress={this.props.onActionPress}
				>
                    <Text style={styles.backTextWhite}>{section == 0 ? '删除' : '添加'}</Text>
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
		width: 75,
		right: 0
	},
	backTextWhite: {
		fontSize: FONT_SIZE(14),
		fontWeight: '400',
		color: 'white',
	}
});