// screens/UserStudentDashboard.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const UserStudentDashboard = ({ navigation }) => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <TouchableOpacity
        style={tw`bg-blue-500 px-4 py-2 rounded-md mb-4`}
        onPress={() => navigation.navigate('MarksScreen')}
      >
        <Text style={tw`text-white text-lg`}>View Marks</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`bg-blue-500 px-4 py-2 rounded-md mb-4`}
        onPress={() => navigation.navigate('FeeStatusScreen')}
      >
        <Text style={tw`text-white text-lg`}>Fee Status</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`bg-blue-500 px-4 py-2 rounded-md mb-4`}
        onPress={() => navigation.navigate('TimetableScreen')}
      >
        <Text style={tw`text-white text-lg`}>View Timetable</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`bg-blue-500 px-4 py-2 rounded-md mb-4`}
        onPress={() => navigation.navigate('SyllabusScreen')}
      >
        <Text style={tw`text-white text-lg`}>View Syllabus</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserStudentDashboard;
