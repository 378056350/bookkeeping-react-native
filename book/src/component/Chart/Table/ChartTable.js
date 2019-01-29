import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    View,
    Text,
    SectionList,
    StyleSheet
} from 'react-native';
import CTHeader from './CTHeader'
import CTSectionHeader from './CTSectionHeader'
import CTHeaderCell from './CTHeaderCell'


export default class ChartTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            models: [{ 
                title: "title", 
                max: 0, 
                sum: 0, 
                avg: 0,
                chart: {year: 0, month: 0, day: 0, week: 0, count: 0},
                data: [] 
            }]
        }
    }

    setModel = (models)=>{
        this.setState({
            models: models
        })
    }

    _ListHeaderComponent = ()=>{
        return (
            <CTHeader 
                models={this.state.models}
                dateIndex={this.props.dateIndex}
                subdateIndex={this.props.subdateIndex}
                navigationIndex={this.props.navigationIndex}
            />
        )
    }
    _renderSectionHeader = ()=>{
        return (
            <CTSectionHeader 
                models={this.state.models} 
                navigationIndex={this.props.navigationIndex}
            />
        )
    }
    _renderItem = ({ item, index, section })=>{
        return (
            <CTHeaderCell model={item} max={this.state.models[0].max}/>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    style={styles.list}
                    ListHeaderComponent={this._ListHeaderComponent}
                    renderSectionHeader={this._renderSectionHeader}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => item + index}
                    sections={this.state.models}
                    extraData={this.state}
                />
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        backgroundColor: 'white',
    },
    list: {
        
    }
});