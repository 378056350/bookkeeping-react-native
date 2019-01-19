import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';


const back = require('~/assets/image/nav_back_n.png')
export default class NavigationBack extends Component {

    render() {
        return (
            <TouchableOpacity 
                activeOpacity={0.8} 
                onPress={this.props.onPress} 
                style={[styles.backImageTouch, {...this.props.style}]}
            >
                <Image source={back} resizeMode={'contain'} style={styles.backImage}/>
            </TouchableOpacity>
        );
    }
}


NavigationBack.propTypes = {
    onPress: PropTypes.func.isRequired,
}
NavigationBack.defaultProps = {
    onPress: ()=>{}
};



const styles = StyleSheet.create({
    backImageTouch: {
      paddingLeft: countcoordinatesX(20),
      paddingRight: countcoordinatesX(20),
    },
    backImage: {
      width: countcoordinatesX(50),
      height: 44,
    },
  });
