import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const ManageStudents = () => {
  const navigation = useNavigation();
  return (
    <View style={tw`flex-1 p-4 bg-white`}>
      <Text style={tw`text-4xl font-bold text-center mb-8 text-indigo-700 `}>Welcome to Student Section!</Text>
      <TouchableOpacity
        style={tw`bg-indigo-700 p-4 rounded mb-4 z-10`}
        activeOpacity={0.5}
        onPress={() => navigation.navigate('AddStudents')}
      >
        <Text style={tw`text-white text-center text-lg`}>Add Students</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`bg-indigo-700 p-4 rounded mb-4 z-10`}
        activeOpacity={0.5}
        onPress={() => navigation.navigate('AddFee')}
      >
        <Text style={tw`text-white text-center text-lg`}>Add Fee </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`bg-indigo-700 p-4 rounded mb-4 z-10`}
        activeOpacity={0.5}
        onPress={() => navigation.navigate('StudentAgeReport')}
      >
        <Text style={tw`text-white text-center text-lg`}>View Report</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ManageStudents