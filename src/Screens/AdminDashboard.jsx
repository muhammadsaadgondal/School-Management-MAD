import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import heroimage from '../assets/dashboardimage.jpg'
const AdminDashboard = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 p-4 bg-white`}>
      <Text style={tw`text-4xl font-bold text-center mb-8 text-indigo-700 `}>Welcome Admin!</Text>
      <Image
        style={tw`w-full h-48 mb-4`}
        source={ heroimage }
      />
      <TouchableOpacity
         style={tw`bg-indigo-700 p-4 rounded mb-4 z-10`}
         activeOpacity={0.5}
        onPress={() => navigation.navigate('ManageTeachers')}
      >
        <Text style={tw`text-white text-center text-lg`}>Manage Teachers</Text>
      </TouchableOpacity>
      <TouchableOpacity
         style={tw`bg-indigo-700 p-4 rounded mb-4 z-10`}
         activeOpacity={0.5}
        onPress={() => navigation.navigate('ManageStudents')}
      >
        <Text style={tw`text-white text-center text-lg`}>Manage Students</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`bg-indigo-700 p-4 rounded mb-4 z-10`}
        activeOpacity={0.5}
        onPress={() => navigation.navigate('ManageClasses')}
      >
        <Text style={tw`text-white text-center text-lg`}>Manage Classes</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default AdminDashboard;
