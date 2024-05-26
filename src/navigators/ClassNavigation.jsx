import { createStackNavigator } from "@react-navigation/stack";
import ManageClasses from "../Screens/ManageClasses";
import ClassDetail from "../Screens/ClassDetail";
import RegisterScreen from "../Screens/RegisterScreen";
import AnnouncementScreen from "../Screens/AnnouncementScreen";
import AdminDashboard from "../Screens/AdminDashboard";
import ManageStudents from "../Screens/students/ManageStudents";
import AddStudents from "../Screens/students/AddStudents";
import AddFee from "../Screens/students/AddFee";



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
      {/* Students Navigation */}
      <ClassStack.Screen name="ManageStudents" component={ManageStudents} />
      <ClassStack.Screen name="AddStudents" component={AddStudents} />
      <ClassStack.Screen name="AddFee" component={AddFee} />

      <ClassStack.Screen name="ClassDetail" component={ClassDetail} />
      <ClassStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <ClassStack.Screen name="AnnouncementScreen" component={AnnouncementScreen} />

    </ClassStack.Navigator>
  );
}

export default ClassNavigation;