import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import tw from 'twrnc';
import { IconButton } from 'react-native-paper';
import ClassNavigation from './src/navigators/ClassNavigation';
import StudentNavigation from './src/navigators/StudentNavigation';
import DashboardNavigation from './src/navigators/DashboardNavigator';
import UserStudentNavigation from './src/navigators/UserStudentNavigation';
import TeacherNavigator from './src/navigators/TeacherNavigator';
import LoginScreen from './src/Screens/LoginScreen';
import { AuthProvider } from './src/auth/AuthContext';

const Tab = createBottomTabNavigator();

const App = () => {
  const [showHomePage, setShowHomePage] = useState(false);

  const homePageStateHandler = () => {
    setShowHomePage(true);
  };

  if (!showHomePage) {
    return  <AuthProvider><NavigationContainer><LoginScreen setShowHomePage={homePageStateHandler} /></NavigationContainer></AuthProvider> ;
  }

  return (
    <AuthProvider>
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
                  iconColor="red" // Change icon color based on focus
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
                  iconColor="red" // Change icon color based on focus
                />
              ),
            }}
          />
          <Tab.Screen
            name="DashboardNavigation"
            component={DashboardNavigation}
            options={{
              tabBarIcon: ({ focused }) => (
                <IconButton
                  style={tw`bg-${focused ? 'red-300' : 'white'}`}
                  icon="account-supervisor-circle"
                  size={20}
                  iconColor="red" // Change icon color based on focus
                />
              ),
            }}
          />
          <Tab.Screen
            name="UserStudentNavigation"
            component={UserStudentNavigation}
            options={{
              tabBarIcon: ({ focused }) => (
                <IconButton
                  style={tw`bg-${focused ? 'red-300' : 'white'}`}
                  icon="account-supervisor-circle"
                  size={20}
                  iconColor="red" // Change icon color based on focus
                />
              ),
            }}
          />
          <Tab.Screen
            name="TeacherNavigator"
            component={TeacherNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <IconButton
                  style={tw`bg-${focused ? 'red-300' : 'white'}`}
                  icon="account-supervisor-circle"
                  size={20}
                  iconColor="red" // Change icon color based on focus
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
