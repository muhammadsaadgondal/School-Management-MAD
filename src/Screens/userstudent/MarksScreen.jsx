import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../auth/AuthContext';


const MarksScreen = () => {
  // const [marks, setMarks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log('User:', user);
  }, [user]);

  // useEffect(() => {
  //   const fetchMarks = async () => {
  //     try {
  //       const marksSnapshot = await firestore().collection('Student').get();
  //       const marksData = marksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //       setMarks(marksData);
  //     } catch (error) {
  //       console.error('Error fetching marks:', error.message);
  //     }
  //   };

  //   fetchMarks();
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Marks Screen</Text>
      <View>
        <Text style={styles.studentName}>{user.data.name}</Text>
        {user.data.session &&
          user.data.session.map((session, sessionIndex) => (
            <View key={sessionIndex}>
              {session.subjects &&
                session.subjects.map((subject, index) => (
                  <Text key={`${subject.name}`} style={styles.subject}>
                    {subject.name}: MidTerm: {subject.midTerm}, FirstTerm: {subject.firstTerm}, FinalTerm: {subject.finalTerm}
                  </Text>
                ))}
            </View>
          ))}
      </View>
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
