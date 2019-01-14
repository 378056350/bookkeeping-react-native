import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import Global from '~/utils/Global'
// import Tabbar from '~/component/Tabbar/Tabbar'
import Login from '~/component/Login/Login'


export default class App extends Component {

  render() {
    return (
      // <Provider store={store}>
        <Login/>
      // </Provider>
    );
  }
}

