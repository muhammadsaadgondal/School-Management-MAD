// screens/SyllabusScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const SyllabusScreen = () => {
  const [syllabus, setSyllabus] = useState([]);

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const syllabusSnapshot = await firestore().collection('Syllabus').get();
        const syllabusData = syllabusSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSyllabus(syllabusData);
      } catch (error) {
        console.error('Error fetching syllabus:', error.message);
      }
    };

    fetchSyllabus();
  }, []);

  return (
    <View>
      <Text>Syllabus Screen</Text>
      <FlatList
        data={syllabus}
        renderItem={({ item }) => (
          <View>
            <Text>{item.subject}: {item.topics}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default SyllabusScreen;
