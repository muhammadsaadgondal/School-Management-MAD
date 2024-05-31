import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../auth/AuthContext';
import { WebView } from 'react-native-webview';

const SyllabusScreen = () => {
  const [syllabusUrl, setSyllabusUrl] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        // Extract class ID from user's registration number
        const classId = user.data.regNo.substring(0,1); // Assuming registration number is like "004" and class ID is "0"
        console.log('Class ID:', classId);

        // Fetch class data from Firestore
        const classData = await firestore().collection('Class').doc(classId).get();
        console.log('Class Data:', classData.data());

        const classSyllabusUrl = classData.data().syllabusUrl;
        setSyllabusUrl(classSyllabusUrl);
      } catch (error) {
        console.error('Error fetching syllabus:', error.message);
      }
    };

    fetchSyllabus();
  }, []);



  const openSyllabusUrl = () => {
    if (syllabusUrl) {
      Linking.openURL(syllabusUrl);
    }
  };

  return (
    <View>
      <Text>Syllabus Screen</Text>
      {syllabusUrl ? (
        <TouchableOpacity onPress={openSyllabusUrl}>
          <Text>View Syllabus</Text>
        </TouchableOpacity>
      ) : (
        <Text>No syllabus available</Text>
      )}
    </View>
  );
};

export default SyllabusScreen;
