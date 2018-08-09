import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Icon } from 'native-base';
import { createBottomTabNavigator } from 'react-navigation';

import HomeTab from './AppTabNavigator/HomeTab';
import BlogTab from './AppTabNavigator/BlogTab';
import PodcastTab from './AppTabNavigator/PodcastTab';
import VideoTab from './AppTabNavigator/VideoTab';
import ProfileTab from './AppTabNavigator/ProfileTab';
import GiftTab from './AppTabNavigator/GiftTab';


class MainScreen extends React.Component {

   static navigationOptions = {
      header: null
   }

  render() {
    return (
      <AppTabNavigator />
    );
  }
}

export default MainScreen;

const AppTabNavigator = createBottomTabNavigator({
   HomeTab: {
      screen: HomeTab
   },
   BlogTab: {
      screen: BlogTab
   },
   PodcastTab: {
      screen: PodcastTab
   },
   VideoTab: {
      screen: VideoTab
   },
   // ProfileTab: {
   //    screen: ProfileTab
   // },
   GiftTab: {
      screen: GiftTab
   }
}, {
   animationEnabled: true,
   swipeEnabled: true,
   tabBarPosition: "bottom",
   tabBarOptions: {
      style: {
         ...Platform.select({
            android: {
               backgroundColor: 'white'
            }
         })
      },
      activeTintColor: '#000',
      inactiveTintColor: '#d1cece',
      showLabel: false,
      showIcon: true,
   }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
