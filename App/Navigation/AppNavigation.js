import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react';
import { Images, Colors, Metrics } from '../Themes'
import { StyleSheet, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import RequestsScreen from '../Screens/RequestsScreen'
import ConfirmedScreen from '../Screens/ConfirmedScreen'
import PostsScreen from '../Screens/PostsScreen'
import ThreadScreen from '../Screens/ThreadScreen'
import ContactsScreen from '../Screens/ContactsScreen'
import OptionsScreen from '../Screens/OptionsScreen'

const ScheduleTab = createBottomTabNavigator();
function ScheduleTabComponent () {
  return (
      <ScheduleTab.Navigator
        initialRouteName='Requests'
        tabBarOptions={{
          activeTintColor: Colors.black,
          showLabel: true,
        }}>
        <ScheduleTab.Screen name="Requests" component={RequestsScreen} />
        <ScheduleTab.Screen name="Confirmed" component={ConfirmedScreen} />
      </ScheduleTab.Navigator>
  );
}

const BulletinStack = createStackNavigator();
function BulletinStackComponent () {
  return (
      <BulletinStack.Navigator
        initialRouteName='Posts'
        screenOptions = {{headerShown: false}}>
        <BulletinStack.Screen name="Posts" component={PostsScreen} />
        <BulletinStack.Screen name="Thread" component={ThreadScreen} />
      </BulletinStack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Contacts">
        <Drawer.Screen name="Contacts" component={ContactsScreen} />
        <Drawer.Screen name="Schedule" component={ScheduleTabComponent} />
        <Drawer.Screen name="Bulletin" component={BulletinStackComponent} />
        <Drawer.Screen name="Options" component={OptionsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
