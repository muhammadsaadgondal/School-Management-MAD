import React from 'react';
import ManageClasses from './src/Screens/ManageClasses';
import ClassDetail from './src/Screens/ClassDetail';
import AddClassScreen from './src/Screens/AddClassScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { BottomNavigation, IconButton } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import tw from 'twrnc';
import RegisterScreen from './src/Screens/RegisterScreen';
import AnnouncementScreen from './src/Screens/AnnouncementScreen';
import ClassNavigation from './src/navigators/ClassNavigation';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator

        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false, // Hide labels
        }}

      >
        <Tab.Screen
          name="ClassNavigation"
          component={ClassNavigation}
          options={{
            tabBarIcon: ({ focused }) => (
              <IconButton
                style={tw`bg-${focused ? 'red-300' : 'white'}`}
                icon="account-supervisor-circle"
                size={20}
                iconColor='red'// Change icon color based on focus
              />
            ),
          }}
        />
        <Tab.Screen
          name="AnnouncementScreen"
          component={AnnouncementScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <IconButton
                style={tw`bg-${focused ? 'red-300' : 'white'}`}
                icon="view-dashboard"
                size={20}
                iconColor='red' // Change icon color based on focus

              />
            ),
          }}
        />
        <Tab.Screen
          name="ClassDetail"
          component={ClassDetail}
          options={{
            tabBarIcon: ({ focused }) => (
              <IconButton
                style={tw`bg-${focused ? 'red-300' : 'white'}`}
                icon="account-tie"
                size={20}
                iconColor='red'
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};



export default App;
