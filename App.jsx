import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
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
import OnBoardingScreen from './src/Screens/OnBoardingScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AdminTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false, // Hide labels
    }}
  >

    <Tab.Screen name="ClassNavigation" component={ClassNavigation} options={{
      tabBarIcon: ({ focused }) => (
        <IconButton
          style={tw`bg-${focused ? 'red-300' : 'white'}`}
          icon="account-supervisor-circle"
          size={20}
          iconColor="red" // Change icon color based on focus
        />
      ),
    }} />
    <Tab.Screen name="StudentNavigation" component={StudentNavigation} options={{
      tabBarIcon: ({ focused }) => (
        <IconButton
          style={tw`bg-${focused ? 'red-300' : 'white'}`}
          icon="account-supervisor-circle"
          size={20}
          iconColor="red" // Change icon color based on focus
        />
      ),
    }} />
    <Tab.Screen name="DashboardNavigation" component={DashboardNavigation} options={{
      tabBarIcon: ({ focused }) => (
        <IconButton
          style={tw`bg-${focused ? 'red-300' : 'white'}`}
          icon="account-supervisor-circle"
          size={20}
          iconColor="red" // Change icon color based on focus
        />
      ),
    }} />
    <Tab.Screen name="UserStudentNavigation" component={UserStudentNavigation} options={{
      tabBarIcon: ({ focused }) => (
        <IconButton
          style={tw`bg-${focused ? 'red-300' : 'white'}`}
          icon="account-supervisor-circle"
          size={20}
          iconColor="red" // Change icon color based on focus
        />
      ),
    }} />
    <Tab.Screen name="TeacherNavigator" component={TeacherNavigator} options={{
      tabBarIcon: ({ focused }) => (
        <IconButton
          style={tw`bg-${focused ? 'red-300' : 'white'}`}
          icon="account-supervisor-circle"
          size={20}
          iconColor="red" // Change icon color based on focus
        />
      ),
    }} />
  </Tab.Navigator>
);

const TeacherTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false, // Hide labels
    }}
  >

    <Tab.Screen name="ClassNavigation" component={ClassNavigation} options={{
      tabBarIcon: ({ focused }) => (
        <IconButton
          style={tw`bg-${focused ? 'red-300' : 'white'}`}
          icon="account-supervisor-circle"
          size={20}
          iconColor="red" // Change icon color based on focus
        />
      ),
    }} />
    <Tab.Screen name="StudentNavigation" component={StudentNavigation} options={{
      tabBarIcon: ({ focused }) => (
        <IconButton
          style={tw`bg-${focused ? 'red-300' : 'white'}`}
          icon="account-supervisor-circle"
          size={20}
          iconColor="red" // Change icon color based on focus
        />
      ),
    }} />
    <Tab.Screen name="DashboardNavigation" component={DashboardNavigation} options={{
      tabBarIcon: ({ focused }) => (
        <IconButton
          style={tw`bg-${focused ? 'red-300' : 'white'}`}
          icon="account-supervisor-circle"
          size={20}
          iconColor="red" // Change icon color based on focus
        />
      ),
    }} />
    <Tab.Screen name="UserStudentNavigation" component={UserStudentNavigation} options={{
      tabBarIcon: ({ focused }) => (
        <IconButton
          style={tw`bg-${focused ? 'red-300' : 'white'}`}
          icon="account-supervisor-circle"
          size={20}
          iconColor="red" // Change icon color based on focus
        />
      ),
    }} />
    <Tab.Screen name="TeacherNavigator" component={TeacherNavigator} options={{
      tabBarIcon: ({ focused }) => (
        <IconButton
          style={tw`bg-${focused ? 'red-300' : 'white'}`}
          icon="account-supervisor-circle"
          size={20}
          iconColor="red" // Change icon color based on focus
        />
      ),
    }} />
  </Tab.Navigator>
);

const StudentTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false, // Hide labels
    }}
  >

    <Tab.Screen name="ClassNavigation" component={ClassNavigation} options={{
      tabBarIcon: ({ focused }) => (
        <IconButton
          style={tw`bg-${focused ? 'red-300' : 'white'}`}
          icon="account-supervisor-circle"
          size={20}
          iconColor="red" // Change icon color based on focus
        />
      ),
    }} />
    <Tab.Screen name="StudentNavigation" component={StudentNavigation} options={{
      tabBarIcon: ({ focused }) => (
        <IconButton
          style={tw`bg-${focused ? 'red-300' : 'white'}`}
          icon="account-supervisor-circle"
          size={20}
          iconColor="red" // Change icon color based on focus
        />
      ),
    }} />
    <Tab.Screen name="DashboardNavigation" component={DashboardNavigation} options={{
      tabBarIcon: ({ focused }) => (
        <IconButton
          style={tw`bg-${focused ? 'red-300' : 'white'}`}
          icon="account-supervisor-circle"
          size={20}
          iconColor="red" // Change icon color based on focus
        />
      ),
    }} />
    <Tab.Screen name="UserStudentNavigation" component={UserStudentNavigation} options={{
      tabBarIcon: ({ focused }) => (
        <IconButton
          style={tw`bg-${focused ? 'red-300' : 'white'}`}
          icon="account-supervisor-circle"
          size={20}
          iconColor="red" // Change icon color based on focus
        />
      ),
    }} />
    <Tab.Screen name="TeacherNavigator" component={TeacherNavigator} options={{
      tabBarIcon: ({ focused }) => (
        <IconButton
          style={tw`bg-${focused ? 'red-300' : 'white'}`}
          icon="account-supervisor-circle"
          size={20}
          iconColor="red" // Change icon color based on focus
        />
      ),
    }} />
  </Tab.Navigator>
);





const App = () => {
  const [showHomePage, setShowHomePage] = useState(false);
  const [showBoardingScreen, setShowBoardingScreen] = useState(true);


  const homePageStateHandler = () => {
    setShowHomePage(true);
  };
  const loginPageStateHandler = () => {
    setShowBoardingScreen(false);
  }

  if(showBoardingScreen){
    return <OnBoardingScreen setShowHomePage={loginPageStateHandler} />
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => <LoginScreen {...props} setShowHomePage={homePageStateHandler} />}
          </Stack.Screen>
          <Stack.Screen name="AdminTabs" component={AdminTabs} options={{ headerShown: false }} />
          <Stack.Screen name="TeacherTabs" component={TeacherTabs} options={{ headerShown: false }} />
          <Stack.Screen name="StudentTabs" component={StudentTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
