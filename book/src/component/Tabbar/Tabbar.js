import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

// import Home from '~/component/Home/Home'
import Home from '~/component/Home/Home/Home'
import Chart from '~/component/Chart/Chart'
import Book from '~/component/Book/Book'
import Find from '~/component/Find/Find'
import Mine from '~/component/Mine/Mine/Mine'
// import Login from '~/component/Login/Login/Login'
import Register from '~/component/Login/Register/Register'
import Register2 from '~/component/Login/Register/Register2'
import Register3 from '~/component/Login/Register/Register3'


import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';


var tabbar_detail_n = require('~/assets/image/tabbar_detail_n.png')
var tabbar_detail_s = require('~/assets/image/tabbar_detail_s.png')
var tabbar_chart_n = require('~/assets/image/tabbar_chart_n.png')
var tabbar_chart_s = require('~/assets/image/tabbar_chart_s.png')
var tabbar_add_n = require('~/assets/image/tabbar_add_n.png')
var tabbar_add_h = require('~/assets/image/tabbar_add_h.png')
var tabbar_discover_n = require('~/assets/image/tabbar_discover_n.png')
var tabbar_discover_s = require('~/assets/image/tabbar_discover_s.png')
var tabbar_mine_n = require('~/assets/image/tabbar_mine_n.png')
var tabbar_mine_s = require('~/assets/image/tabbar_mine_s.png')



// 获取文本
const navigationTitle = (index)=>{
  if (index == 0) {
    return "首页"
  } else if (index == 1) {
    return "图表"
  } else if (index == 2) {
    return "记账"
  } else if (index == 3) {
    return "发现"
  } else if (index == 4) {
    return "我的"
  }
}
// 获取图片
const navigationImage = (index)=>{
  if (index == 0) {
    return [tabbar_detail_n, tabbar_detail_s]
  } else if (index == 1) {
    return [tabbar_chart_n, tabbar_chart_s]
  } else if (index == 2) {
    return [tabbar_add_n, tabbar_add_h]
  } else if (index == 3) {
    return [tabbar_discover_n, tabbar_discover_s]
  } else if (index == 4) {
    return [tabbar_mine_n, tabbar_mine_s]
  }
}


// 单个导航栏配置
const navigationOptions = (has_header, title)=>({
  header: has_header == false ? null : undefined,
  headerTitle: title,
  headerStyle: {
    backgroundColor: kColor_Main_Color,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    fontSize: FONT_SIZE(16),
    fontWeight: 'normal',
  },
})

// 导航栏栈配置
const defaultNavigationOptions = (index)=>({
  tabBarIcon: (({tintColor, focused}) => {
    images = navigationImage(index)
    title = navigationTitle(index)
    if (index != 2) {
      return (
        <View style={styles.normalItem}>
          <Image style={styles.normalIcon} source={focused == true ? images[1] : images[0]}/>
          <Text style={styles.normalName}>{title}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.selectItem}>
          <Image style={styles.selectIcon} source={focused == true ? images[1] : images[0]}/>
          <Text style={styles.selectName}>{title}</Text>
        </View>
      )
    }
  })
})
  



const HomeStack = createStackNavigator({
  Home: {
    screen: Find,
    navigationOptions: navigationOptions(true, '发现')
  }
}, {
  navigationOptions: defaultNavigationOptions(0)
});
const ChartStack = createStackNavigator({
  Chart: {
    screen: Chart,
    navigationOptions: navigationOptions(false)
  },
}, {
  navigationOptions: defaultNavigationOptions(1)
});
const BookStack = createStackNavigator({
  Book: {
    screen: Book,
    navigationOptions: navigationOptions(true)
  },
}, {
  navigationOptions: defaultNavigationOptions(2)
});
const FindStack = createStackNavigator({
  Find: {
    screen: Find,
    navigationOptions: navigationOptions(true, '发现')
  },
}, {
  navigationOptions: defaultNavigationOptions(3)
});
const MineStack = createStackNavigator({
  Mine: {
    screen: Mine,
    navigationOptions: navigationOptions(false)
  }
}, {
  navigationOptions: defaultNavigationOptions(4)
});


export default createAppContainer(createBottomTabNavigator(
  {
    Home: HomeStack,
    Chart: ChartStack,
    Book: BookStack,
    Find: FindStack,
    Mine: MineStack,
  },
  {
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      showLabel: false,
      lazy: false,
      style: {
        backgroundColor: 'white',
        borderTopColor: 'rgba(230, 230, 230, 1)',
      },
    },
  }
));

const styles = StyleSheet.create({
  normalItem: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: SCREEN_WIDTH / 5,
    marginBottom: 6,
  },
  normalIcon: {
    width: countcoordinatesX(50),
    height: countcoordinatesX(50),
  },
  normalName: {
    marginTop: 2,
    fontSize: FONT_SIZE(8),
    fontWeight: '100',
    color: kColor_Text_Black
  },
  selectItem: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: SCREEN_WIDTH / 5,
    marginBottom: 6,
  },
  selectIcon: {
    width: countcoordinatesX(140),
    height: countcoordinatesX(140),
  },
  selectName: {
    marginTop: 2,
    fontSize: FONT_SIZE(8),
    fontWeight: '100',
    color: kColor_Text_Black
  },
});