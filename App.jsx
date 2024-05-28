import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import tw from 'twrnc';
import ClassNavigation from './src/navigators/ClassNavigation';
import { IconButton } from 'react-native-paper';
import StudentNavigation from './src/navigators/StudentNavigation';

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
          name="StudentNavigation"
          component={StudentNavigation}
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
        
      </Tab.Navigator>
    </NavigationContainer>
  );
};



export default App;
