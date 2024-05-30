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


export const getClass = (id) => {
  switch (id) {
      case '0':
          return 'Nursery';
      case '1':
          return 'Prep';
      case '2':
          return '1';
      case '3':
          return '2';
      case '4':
          return '3';
      case '5':
          return '4';
      case '6':
          return '5';
      case '7':
          return '6';
      case '8':
          return '7';
      case '9':
          return '8';
      default:
          return '';
  }
};


const ProfileScreen = ({ route, navigation }) => {
  const { profileType, profileData, gradeTeaching } = route.params;

  return (
    <View style={tw`flex-1 bg-blue-800 justify-center`}>
      <ScrollView
        contentContainerStyle={tw`flex-grow justify-center items-center px-4`}
      >
        <View style={tw`bg-white m-4 p-4 rounded-lg shadow-lg w-full`}>
          <View style={tw`items-center`}>
            <Avatar.Image
              size={100}
              source={{ url: 'https://via.placeholder.com/150' }}
              style={tw`mb-4`}
            />
            <Text style={tw`text-2xl font-bold text-indigo-800 mb-2`}>
              {profileData.name}
            </Text>
            <Text style={tw`text-lg text-indigo-600 mb-4`}>
              {profileType === 'student' ? `Student ID: ${profileData.regNo}` : `Teacher`}
            </Text>
          </View>

          <View style={tw`mb-4`}>
            {profileType === 'student' ? (
              <>
                <Text style={tw`text-lg text-indigo-800 mb-2`}>Gender: {profileData.gender}</Text>
                <Text style={tw`text-lg text-indigo-800 mb-2`}>Caste: {profileData.father.caste}</Text>
                <Text style={tw`text-lg text-indigo-800 mb-2`}>Date-of-birth: {new Date(profileData.DoB).toLocaleDateString()}</Text>
                <Text style={tw`text-lg text-indigo-800 mb-2`}>Father: {profileData.father.name}</Text>
              </>
            ) : (
              <>
                <Text style={tw`text-lg text-indigo-800 mb-2`}>Gender: {profileData.gender == '1' ? "Male" : "Female"}</Text>
                <Text style={tw`text-lg text-indigo-800 mb-2`}>Teaching Grade: {getClass(gradeTeaching)}</Text>
                <Text style={tw`text-lg text-indigo-800 mb-2`}>Email: {profileData.loginCred.email}</Text>
                <Text style={tw`text-lg text-indigo-800 mb-2`}>Joining Date: {profileData.DoJ} years</Text>
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
