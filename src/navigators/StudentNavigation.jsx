import { createStackNavigator } from "@react-navigation/stack";

import ManageStudents from "../Screens/students/ManageStudents";
import AddStudents from "../Screens/students/AddStudents";
import AddFee from "../Screens/students/AddFee";
import StudentAgeReport from "../Screens/students/StudentAgeReport";
import UpdateStudent from "../Screens/students/UpdateStudent";



const StudentStack = createStackNavigator();

function StudentNavigation() {
  return (
    <StudentStack.Navigator
    screenOptions={{
        headerShown: false, 
    }}
    >
      {/* Students Navigation */}
      <StudentStack.Screen name="ManageStudents" component={ManageStudents} />
      <StudentStack.Screen name="AddStudents" component={AddStudents} />
      <StudentStack.Screen name="UpdateStudent" component={UpdateStudent} />
      <StudentStack.Screen name="AddFee" component={AddFee} />
      <StudentStack.Screen name="StudentAgeReport" component={StudentAgeReport} />


      

    </StudentStack.Navigator>
  );
}

export default StudentNavigation;