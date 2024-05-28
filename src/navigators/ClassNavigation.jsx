import { createStackNavigator } from "@react-navigation/stack";
import ManageClasses from "../Screens/class/ManageClasses";
import ClassDetail from "../Screens/class/ClassDetail";
import RegisterScreen from "../Screens/class/RegisterScreen";
import AnnouncementScreen from "../Screens/class/AnnouncementScreen";
import AdminDashboard from "../Screens/class/AdminDashboard";
import ProfileScreen from "../Screens/class/ProfileScreen";




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