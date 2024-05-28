import { createStackNavigator } from "@react-navigation/stack";
import ManageClasses from "../Screens/class/ManageClasses";
import ClassDetail from "../Screens/class/ClassDetail";
import RegisterScreen from "../Screens/class/RegisterScreen";
import AnnouncementScreen from "../Screens/class/AnnouncementScreen";
import AdminDashboard from "../Screens/students/AdminDashboard";
import ProfileScreen from "../Screens/class/ProfileScreen";

const DashboardStack = createStackNavigator();

function DashboardNavigation() {
  return (
    <DashboardStack.Navigator
    screenOptions={{
        headerShown: false, 
    }}
    >
      <DashboardStack.Screen name="Profile" component={ProfileScreen} />

    </DashboardStack.Navigator>
  );
}

export default DashboardNavigation;