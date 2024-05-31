import { createStackNavigator } from "@react-navigation/stack";
import UserStudentDashboard from "../Screens/userstudent/UserStudentDashboard";
import MarksScreen from "../Screens/userstudent/MarksScreen";
import TimetableScreen from "../Screens/userstudent/TimetableScreen";
import FeeStatusScreen from "../Screens/userstudent/FeeStatusScreen";
import SyllabusScreen from "../Screens/userstudent/SyllabusScreen";





const UserStudentStack = createStackNavigator();

function UserStudentNavigation() {
  return (
    <UserStudentStack.Navigator
    screenOptions={{
        headerShown: false, 
    }}
    >
      <UserStudentStack.Screen name="UserStudentDashboard" component={UserStudentDashboard} />
      <UserStudentStack.Screen name="MarksScreen" component={MarksScreen} />
      <UserStudentStack.Screen name="TimetableScreen" component={TimetableScreen} />
      <UserStudentStack.Screen name="FeeStatusScreen" component={FeeStatusScreen} />
      <UserStudentStack.Screen name="SyllabusScreen" component={SyllabusScreen} />

    </UserStudentStack.Navigator>
  );
}

export default UserStudentNavigation;