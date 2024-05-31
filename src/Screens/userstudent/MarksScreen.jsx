import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const MarksScreen = () => {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const marksSnapshot = await firestore().collection('Student').get();
        const marksData = marksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMarks(marksData);
      } catch (error) {
        console.error('Error fetching marks:', error.message);
      }
    };

    fetchMarks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Marks Screen</Text>
      <FlatList
        data={marks}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.studentName}>{item.name}</Text>
            {item.session && item.session.subjects && item.session.subjects.map((subject, index) => (
              <Text key={index} style={styles.subject}>
                {subject.name}: MidTerm: {subject.midTerm}, FirstTerm: {subject.firstTerm}, FinalTerm: {subject.finalTerm}
              </Text>
            ))}
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  subject: {
    fontSize: 16,
    color: '#000',
  },
});

export default MarksScreen;
