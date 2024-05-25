import ManageClasses from './src/Screens/ManageClasses';
import ClassDetail from './src/Screens/ClassDetail';
import AddClassScreen from './src/Screens/AddClassScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { BottomNavigation, Icon, IconButton } from 'react-native-paper';
import tw from 'twrnc';
const Tab = createBottomTabNavigator();

const navigationScreens = ["Dashboard", "Teachers", "Students", "Classes"]

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
          name="AddClassScreen"
          component={AddClassScreen}
          options={{
            tabBarIcon: () => {
              return <IconButton
                icon="view-dashboard"
                size={20}
                iconColor='red' 
              />
            },
          }}
        />
        <Tab.Screen
          name="ManageClasses"
          component={ManageClasses}
          options={{
            tabBarIcon: () => {
              return <IconButton
                icon="account-supervisor-circle"
                size={20}
                iconColor='red' 
              />
            },
          }}
        />
        <Tab.Screen
          name="ClassDetail"
          component={ClassDetail}
          options={{
            tabBarIcon: () => {
              return <IconButton
                icon="account-tie"
                size={20}
                iconColor='red' 
              />
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
