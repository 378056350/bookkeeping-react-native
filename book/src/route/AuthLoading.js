import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AppRouter from './AppRouter';
import AuthRouter from './AuthRouter';

class AuthLoadingScreen extends Component {

  componentDidMount() {
    this.props.navigation.navigate('AppRouter');
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}

export default AuthLoadingRouter = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      AppRouter: AppRouter,
      AuthRouter: AuthRouter
    }, {
      initialRouteName: 'AuthLoading'
    }
  )
);
