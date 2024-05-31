import { createStackNavigator } from "@react-navigation/stack";
import ClassView from "../Screens/teacher/ClassView";
import StudentMarks from "../Screens/teacher/StudentMarks";

const TeacherStack = createStackNavigator();

function TeacherNavigator() {
  return (
    <TeacherStack.Navigator
    screenOptions={{
        headerShown: false, 
    }}
    >
      <TeacherStack.Screen name="Class" component={ClassView} />
      <TeacherStack.Screen name="Marks" component={StudentMarks} />

    </TeacherStack.Navigator>
  );
}

export default TeacherNavigator;