import { createStackNavigator } from "@react-navigation/stack";

import AdminDashboard from "../Screens/AdminDashboard";
import ManageStudents from "../Screens/students/ManageStudents";
import AddStudents from "../Screens/students/AddStudents";
import AddFee from "../Screens/students/AddFee";



const ClassStack = createStackNavigator();

function StudentNavigation() {
  return (
    <ClassStack.Navigator
    screenOptions={{
        headerShown: false, 
    }}
    >
      <ClassStack.Screen name="AdminDashboard" component={AdminDashboard} />
      {/* Students Navigation */}
      <ClassStack.Screen name="ManageStudents" component={ManageStudents} />
      <ClassStack.Screen name="AddStudents" component={AddStudents} />
      <ClassStack.Screen name="AddFee" component={AddFee} />

      

    </ClassStack.Navigator>
  );
}

export default StudentNavigation;