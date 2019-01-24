import React, { Component } from 'react';
import Global from '~/utils/Global'
import { Provider } from 'react-redux';
import store from './redux/store/Store';
import AuthLoading from '~/route/AuthLoading'


export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <AuthLoading/>
      </Provider>
    );
  }
}

