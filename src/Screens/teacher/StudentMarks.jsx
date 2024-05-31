import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, TextInput, Button, Title } from 'react-native-paper';

const StudentMarks = () => {
  const [subjects, setSubjects] = useState([
    { firstTerm: 10, name: 'English', midTerm: 10, finalTerm: 10 },
    { firstTerm: 0, name: 'Urdu', midTerm: 0, finalTerm: 0 },
    { firstTerm: 0, name: 'Mathematics', midTerm: 0, finalTerm: 0 },
    { firstTerm: 0, name: 'General Knowledge', midTerm: 0, finalTerm: 0 },
    { firstTerm: 0, name: 'Islamiat', midTerm: 0, finalTerm: 0 },
    { firstTerm: 0, name: 'Computer Science', midTerm: 0, finalTerm: 0 }
  ]);
  const [editable, setEditable] = useState(null);
  const [originalSubjects, setOriginalSubjects] = useState([...subjects]);

  const handleUpdate = (index) => {
    setEditable(null);
  };

  const handleCancel = () => {
    setSubjects([...originalSubjects]);
    setEditable(null);
  };

  const handleChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = parseInt(value) || 0;
    setSubjects(newSubjects);
  };

  return (
    <ScrollView style={styles.container}>
      {subjects.map((subject, index) => (
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