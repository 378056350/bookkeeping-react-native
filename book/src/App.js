import React, { Component } from 'react';
import Global from '~/utils/Global'
import { Provider } from 'react-redux';
import store from './redux/store/Store';
// import Tabbar from '~/component/Tabbar/Tabbar'
import AuthLoading from '~/route/AuthLoading'
// import Login from '~/component/Login/Login/Login'
// import Register from '~/component/Login/Register/Register'


export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <AuthLoading/>
      </Provider>
    );
  }
}

