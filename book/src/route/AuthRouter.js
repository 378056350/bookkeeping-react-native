import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from '~/component/Login/Login/Login'
// import Register from '~/component/Login/Register/Register'
// import Register2 from '~/component/Login/Register/Register2'
// import Register3 from '~/component/Login/Register/Register3'

export default AuthRouter = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: () => ({
        header: null
      })
    }
  },
  {
    defaultNavigationOptions: () => ({
      header: null,
      gesturesEnabled: true
    }),
    // headerTransitionPreset: 'fade-in-place',
    // headerMode: 'float',
    mode: 'modal'
  }
);
