// screens/TimetableScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const TimetableScreen = () => {
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const timetableSnapshot = await firestore().collection('Timetable').get();
        const timetableData = timetableSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTimetable(timetableData);
      } catch (error) {
        console.error('Error fetching timetable:', error.message);
      }
    };

    fetchTimetable();
  }, []);

  return (
    <View>
      <Text>Timetable Screen</Text>
      <FlatList
        data={timetable}
        renderItem={({ item }) => (
          <View>
            <Text>{item.day}: {item.schedule}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default TimetableScreen;
