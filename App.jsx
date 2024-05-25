import React from 'react';
import ManageClasses from './src/Screens/ManageClasses';
import ClassDetail from './src/Screens/ClassDetail';
import AddClassScreen from './src/Screens/AddClassScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { BottomNavigation, IconButton } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import tw from 'twrnc';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false, // Hide labels
        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return (
                  <View >
                    {options.tabBarIcon({ focused, color, size: 40 })}
                  </View>
                );
              }

              return null;
            }}
          />
        )}
      >
        <Tab.Screen
          name="AddClassScreen"
          component={AddClassScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <IconButton
                icon="view-dashboard"
                size={20}
                iconColor={focused ? 'white' : 'red'} // Change icon color based on focus
              />
            ),
          }}
        />
        <Tab.Screen
          name="ManageClasses"
          component={ManageClasses}
          options={{
            tabBarIcon: ({ focused }) => (
              <IconButton
                icon="account-supervisor-circle"
                size={20}
                iconColor={focused ? 'white' : 'red'} // Change icon color based on focus
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
                icon="account-tie"
                size={20}
                iconColor={focused ? 'white' : 'red'} // Change icon color based on focus
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};



export default App;
