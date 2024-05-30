import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const AdminDashboard = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={tw`flex-1 p-4 bg-white`}>
      <Text style={tw`text-4xl font-bold text-center mb-8 text-indigo-700`}>Dashboard</Text>

      <View style={tw`flex-row justify-between mb-8`}>
        <View style={tw`w-5/12 bg-gray-200 p-4 rounded`}>
          <Text style={tw`text-lg text-gray-600`}>Students</Text>
          <Text style={tw`text-3xl font-bold`}>1,200</Text>
        </View>
        <View style={tw`w-5/12 bg-gray-200 p-4 rounded`}>
          <Text style={tw`text-lg text-gray-600`}>Teachers</Text>
          <Text style={tw`text-3xl font-bold`}>300</Text>
        </View>
      </View>

      <View style={tw`flex-row justify-between mb-8`}>
        <View style={tw`w-5/12 bg-gray-200 p-4 rounded`}>
          <Text style={tw`text-lg text-gray-600`}>Classes</Text>
          <Text style={tw`text-3xl font-bold`}>450</Text>
        </View>
        <View style={tw`w-5/12 bg-gray-200 p-4 rounded`}>
          <Text style={tw`text-lg text-gray-600`}>Schools</Text>
          <Text style={tw`text-3xl font-bold`}>5</Text>
        </View>
      </View>

      <Text style={tw`text-2xl font-bold mb-4`}>Announcements</Text>
      <TouchableOpacity style={tw`flex-row items-center mb-4`}>
        <Image
          style={tw`w-12 h-12 rounded-full mr-4`}
          source={{ uri: 'https://placekitten.com/200/200' }}
        />
        <View>
          <Text style={tw`text-lg font-bold`}>New feature: Report...</Text>
          <Text style={tw`text-gray-600`}>Published by Rebecca 2d ago</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={tw`flex-row items-center mb-8`}>
        <Image
          style={tw`w-12 h-12 rounded-full mr-4`}
          source={{ uri: 'https://placekitten.com/200/200' }}
        />
        <View>
          <Text style={tw`text-lg font-bold`}>Happy Teacher's Day!</Text>
          <Text style={tw`text-gray-600`}>Published by John 7d ago</Text>
        </View>
      </TouchableOpacity>

      <Text style={tw`text-2xl font-bold mb-4`}>Reports</Text>
      <TouchableOpacity
        style={tw`bg-indigo-700 p-4 rounded mb-4`}
        activeOpacity={0.5}
        onPress={() => navigation.navigate('GenerateStudentReport')}
      >
        <Text style={tw`text-white text-center text-lg`}>Generate Student Report</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`bg-indigo-700 p-4 rounded mb-8`}
        activeOpacity={0.5}
        onPress={() => navigation.navigate('GenerateTeacherReport')}
      >
        <Text style={tw`text-white text-center text-lg`}>Generate Teacher Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AdminDashboard;
