import { createStackNavigator } from "@react-navigation/stack";
import ManageClasses from "../Screens/ManageClasses";
import ClassDetail from "../Screens/ClassDetail";
import RegisterScreen from "../Screens/RegisterScreen";
import AnnouncementScreen from "../Screens/AnnouncementScreen";
import AdminDashboard from "../Screens/AdminDashboard";




const ClassStack = createStackNavigator();

function ClassNavigation() {
  return (
    <ClassStack.Navigator
    screenOptions={{
        headerShown: false, 
    }}
    >
      <ClassStack.Screen name="AdminDashboard" component={AdminDashboard} />
      <ClassStack.Screen name="ManageClasses" component={ManageClasses} />
      
     
      <ClassStack.Screen name="ClassDetail" component={ClassDetail} />
      <ClassStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <ClassStack.Screen name="AnnouncementScreen" component={AnnouncementScreen} />

    </ClassStack.Navigator>
  );
}

export default ClassNavigation;