import React, { useState, useContext } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  ImageBackground,
  Alert,
} from 'react-native';
import { RadioButton, TextInput, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../auth/AuthContext';

export default function LoginScreen({navigation}) {
  const [checked, setChecked] = useState('Admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);

  const handleSignIn = async () => {
    try {
      let storedUsername = '';
      let storedPassword = '';
      let data = '';
      let actor = '';

      if (checked === 'Admin') {
        const adminDoc = await firestore().collection('admin').get();
        if (!adminDoc.empty) {
          storedUsername = adminDoc.docs[0].data().username;
          storedPassword = adminDoc.docs[0].data().password;
          actor = 'Admin';
          data = adminDoc.docs[0].data();
        }
      } else if (checked === 'Teacher') {
        const teacherDoc = await firestore().collection('Teacher').where('loginCred.email', '==', username).limit(1).get();
        if (!teacherDoc.empty) {
          storedUsername = teacherDoc.docs[0].data().loginCred.email;
          storedPassword = teacherDoc.docs[0].data().loginCred.password;
          actor = 'Teacher';
          data = teacherDoc.docs[0].data();
        }
      } else if (checked === 'Student') {
        const studentDoc = await firestore().collection('Student').doc(username.toString()).get();
        if (studentDoc.exists) {
          storedUsername = studentDoc.data().regNo;
          storedPassword = studentDoc.data().loginCred.password;
          actor = 'Student';
          data = studentDoc.data();
        }
      }

      if (storedUsername === username && storedPassword === password) {
        console.log('Signed in successfully');
        setUser({ actor, data });
        Alert.alert('Sign in Success', 'You have successfully signed in.');

        // Navigate to the appropriate screen based on the actor
        if (actor === 'Admin') {
          navigation.navigate('AdminTabs');
        } else if (actor === 'Teacher') {
          
          navigation.navigate('TeacherTabs');
        } else if (actor === 'Student') {
          
          navigation.navigate('StudentTabs');
        }
      } else {
        console.log('Invalid credentials');
        Alert.alert('Sign in Error', 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      Alert.alert('Sign in Error', 'An error occurred. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://rgsoftwares.com/wp-content/uploads/2021/07/school.png',
        }}
        style={styles.container}
        blurRadius={30}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Login</Text>
        </View>

        <View style={styles.main}>
          <View style={styles.choicesContainer}>
            <Text style={styles.choices}>Admin</Text>
            <RadioButton
              value="Admin"
              status={checked === 'Admin' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Admin')}
            />
            <Text style={styles.choices}>Teacher</Text>
            <RadioButton
              value="Teacher"
              status={checked === 'Teacher' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Teacher')}
            />
            <Text style={styles.choices}>Student</Text>
            <RadioButton
              value="Student"
              status={checked === 'Student' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Student')}
            />
          </View>

          <View style={styles.credentialsContainer}>
            <TextInput
              style={styles.textInput}
              outlineColor="blue"
              label="Username"
              value={username}
              mode="outlined"
              onChangeText={(text) => setUsername(text)}
            />
            <TextInput
              style={styles.textInput}
              outlineColor="blue"
              label="Password"
              value={password}
              mode="outlined"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button onPress={handleSignIn}>Sign In</Button>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '50%',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
  },

  choices: {
    fontWeight: 'bold',
  },

  choicesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },

  credentialsContainer: {
    width: '80%',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  textInput: {
    height: 40,
    width: '100%',
  },

  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerText: {
    fontSize: 30,
    color: 'navy',
    fontWeight: 'bold',
  },

  main: {
    flex: 4,
    gap: 30,
    alignItems: 'center',
  },
});
