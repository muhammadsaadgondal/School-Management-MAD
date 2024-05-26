import { createStackNavigator } from "@react-navigation/stack";
import ManageClasses from "../Screens/ManageClasses";
import ClassDetail from "../Screens/ClassDetail";
import RegisterScreen from "../Screens/RegisterScreen";
import AnnouncementScreen from "../Screens/AnnouncementScreen";
import ProfileScreen from "../Screens/ProfileScreen";



const ClassStack = createStackNavigator();

function ClassNavigation() {
  return (
    <ClassStack.Navigator
    screenOptions={{
        headerShown: false, 
    }}
    >
      <ClassStack.Screen name="ManageClasses" component={ManageClasses} />
      <ClassStack.Screen name="ClassDetail" component={ClassDetail} />
      <ClassStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <ClassStack.Screen name="AnnouncementScreen" component={AnnouncementScreen} />
      <ClassStack.Screen name="Profile" component={ProfileScreen} />

    </ClassStack.Navigator>
  );
}

export default ClassNavigation;