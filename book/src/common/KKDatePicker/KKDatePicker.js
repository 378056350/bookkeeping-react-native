import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    Animated, 
    Easing,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import KDContent from './KDContent'
const contentH = (countcoordinatesX(500) + SAFE_AREA_BOTTOM_HEIGHT)


export default class KKDatePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentAnim: new Animated.Value(-contentH),
            userInteractionEnabled: false
        }
    }

    show = ()=>{
        this.setState({userInteractionEnabled: true})
        Animated.timing(this.state.contentAnim,{ 
            duration: 300,
            easing: Easing.elastic(0),
            toValue: 0
        }).start((result)=>{
          
        });
    }

    hide = ()=>{
        Animated.timing(this.state.contentAnim,{ 
            duration: 300,
            easing: Easing.elastic(0),
            toValue: -contentH
        }).start((result)=>{
            this.setState({userInteractionEnabled: false})
        });
    }
    
    _onConfirm = (year, month, day)=>{
        this.props.onConfirm(year, month, day)
        this.hide()
    }


    render() {
        return (
            <Modal
                animationType="none"
                transparent={true}
                visible={this.state.userInteractionEnabled}
                onRequestClose={() => {
                    
                }}
            >
                <Animated.View style={styles.container}>
                    <TouchableOpacity activeOpacity={1.0} onPress={this.hide} style={[styles.shadowTouch]}>
                        <Animated.View style={[styles.shadow, {
                            opacity: this.state.contentAnim.interpolate({
                                inputRange: [-contentH, 0],
                                outputRange: [0, 1] 
                            })
                        }]}/>
                    </TouchableOpacity>
                    <KDContent 
                        style={{bottom: this.state.contentAnim}} 
                        number={1}
                        onCancle={this.hide}
                        onConfirm={this._onConfirm}
                    />
                </Animated.View>
            </Modal>
        );
    }
}


KKDatePicker.propTypes = {
    onConfirm: PropTypes.func.isRequired,
}
KKDatePicker.defaultProps = {
    onConfirm: ()=>{}
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    shadowTouch: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    shadow: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    }
});