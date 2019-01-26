import React, { Component } from 'react';
import {
    View,
    FlatList,
    StyleSheet
} from 'react-native';
import HomeSubTable from '~/component/Home/Home/SubTable/HomeSubTable'
import REListView from '~/third/REListView/REListView'


export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        setTimeout(() => {
            this.setState({refreshing: false});
        }, 1000);
    }

    _renderItem = ({item, separators})=>{
        return (
            <HomeSubTable 
                models={this.props.models} 
                style={styles.subtable}
            />
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    renderItem={this._renderItem}
                    onRefresh={this._onRefresh}
                    refreshing={this.state.refreshing}
                    showsVerticalScrollIndicator={false}
                    data={[
                        {title: 'Title Text', key: 'item1'},
                        // {title: 'Title Text', key: 'item2'},
                        // {title: 'Title Text', key: 'item3'}
                    ]}
                    models={this.props.models}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        backgroundColor: 'white',
    },
    subtable: {
        backgroundColor: 'white',
    },
});