import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    View,
	Text,
	TouchableOpacity,
    StyleSheet
} from 'react-native';

export default class CActionItem extends PureComponent {

    render() {
        return (
			// this.closeRow(rowMap, data.item.key) 
			//  _ => this.deleteSectionRow(rowMap, data.item.key)
            <View style={styles.rowBack}>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={this.props.onClosePress}>
                    <Text style={styles.backTextWhite}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={this.props.onDeletePress}>
                    <Text style={styles.backTextWhite}>Delete</Text>
                </TouchableOpacity>
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
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0
	},
});