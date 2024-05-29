import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import tw from 'twrnc';

const ProfileScreen = ({ route, navigation }) => {

  // const profileType, profileData, gradeTeaching
  const profileType="Teacher";
  const gradeTeaching='3'
  const profileData = { id: 101, name: "Mr. Smith", email: "temp@gmail.com", experience: 5 } 
  return (
    <View style={tw`flex-1 bg-blue-800 justify-center`}>
      <ScrollView
        contentContainerStyle={tw`flex-grow justify-center items-center px-4`}
      >
        <View style={tw`bg-white m-4 p-4 rounded-lg shadow-lg w-full`}>
          <View style={tw`items-center`}>
            <Avatar.Image
              size={100}
              source={{ uri: profileData.image || 'https://via.placeholder.com/150' }}
              style={tw`mb-4`}
            />
            <Text style={tw`text-2xl font-bold text-indigo-800 mb-2`}>
              {profileData.name}
            </Text>
            <Text style={tw`text-lg text-indigo-600 mb-4`}>
              {profileType === 'student' ? `Student ID: ${profileData.id}` : `Teacher`}
            </Text>
          </View>

          <View style={tw`mb-4`}>
            {profileType === 'student' ? (
              <>
                <Text style={tw`text-lg text-indigo-800 mb-2`}>Age: {profileData.age}</Text>
                <Text style={tw`text-lg text-indigo-800 mb-2`}>Reg No: {profileData.reg_no}</Text>
                <Text style={tw`text-lg text-indigo-800 mb-2`}>Attendance: {profileData.attendance}</Text>
                <Text style={tw`text-lg text-indigo-800 mb-2`}>Gender: {profileData.gender}</Text>
              </>
            ) : (
              <>
                <Text style={tw`text-lg text-indigo-800 mb-2`}>Class: {gradeTeaching}</Text>
                <Text style={tw`text-lg text-indigo-800 mb-2`}>Experience: {profileData.experience} years</Text>
                <Text style={tw`text-lg text-indigo-800 mb-2`}>Email: {profileData.email}</Text>
              </>
            )}
          </View>

          <TouchableOpacity
            style={tw`bg-green-500 p-3 rounded-lg w-full mt-4`}
            onPress={() => navigation.goBack()}
          >
            <Text style={tw`text-white text-center`}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
