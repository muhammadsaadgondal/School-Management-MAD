import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, TextInput, Button, Title } from 'react-native-paper';
import { updateMarks } from '../../handlers-Ali/teacherClassHandler';


const StudentMarks = ({route}) => {
  const {studentId, subjects}= route.params;

  const [subs, setSubs] = useState(subjects);

 
  const [editable, setEditable] = useState(null);
  const [originalSubjects, setOriginalSubjects] = useState(JSON.parse(JSON.stringify(subjects)));

  const handleUpdate = async (index) => {
    try {
      console.log('====================================');
      console.log('Updating marks for student:', studentId);
      console.log('====================================');
      const updatedSubject = subs[index];
      await updateMarks(studentId, updatedSubject.name, {
        firstTerm: updatedSubject.firstTerm,
        midTerm: updatedSubject.midTerm,
        finalTerm: updatedSubject.finalTerm,
      });
      // Success message or any further action after successful update
      console.log('Marks updated successfully');
    } catch (error) {
      console.error('Error updating marks:', error);
      // Handle error
    }
    setEditable(null);
  };

  const handleCancel = () => {
    setSubs([...originalSubjects]);
    setEditable(null);
  };

  const handleChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = parseInt(value) || 0;
    setSubs(newSubjects);
  };

  return (
    <ScrollView style={styles.container}>
      {subs.map((subject, index) => (
        <Card key={index} style={styles.card}>
          <Card.Content>
            <Title>{subject.name}</Title>
            <TextInput
              label="First Term"
              value={String(subject.firstTerm)}
              onChangeText={(text) => handleChange(index, 'firstTerm', text)}
              keyboardType="numeric"
              style={styles.input}
              editable={editable === index}
            />
            <TextInput
              label="Mid Term"
              value={String(subject.midTerm)}
              onChangeText={(text) => handleChange(index, 'midTerm', text)}
              keyboardType="numeric"
              style={styles.input}
              editable={editable === index}
            />
            <TextInput
              label="Final Term"
              value={String(subject.finalTerm)}
              onChangeText={(text) => handleChange(index, 'finalTerm', text)}
              keyboardType="numeric"
              style={styles.input}
              editable={editable === index}
            />
          </Card.Content>
          <Card.Actions>
            {editable === index ? (
              <>
                <Button onPress={() => handleUpdate(index)}>Update</Button>
                <Button onPress={handleCancel}>Cancel</Button>
              </>
            ) : (
              <Button onPress={() => setEditable(index)}>Edit</Button>
            )}
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
  },
});

export default StudentMarks;
