import { useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  ImageBackground,
  Alert,
} from 'react-native';

import { RadioButton, TextInput, Button } from 'react-native-paper';

export default function App() {
  const [checked, setChecked] = useState('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const record = {
    admin :{
      'username':"admin",
      'password':'admin'
    },
    student:{
      'username':'student',
      'password':'stdpwd'
    },
    teacher:{
      'username':"teacher",
      'password':'thrpwd'
    }
  }
  const handleSignIn = () => {
    if(record[checked]['username'] === username && record[checked]['password'] === password){
      console.log('Done')
    }
    else{
      createTwoButtonAlert()
    }
  };

  const createTwoButtonAlert = () =>
    Alert.alert('Sign in Error', 'You credentials are not correct', [
      {
        text: 'Try Again',
        onPress: ()=> {
          setUsername(u => u="");
          setPassword(p => p="");
        },
        style: 'ok',
      }
    ]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://rgsoftwares.com/wp-content/uploads/2021/07/school.png',
        }}
        style={styles.container}
        blurRadius={30}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Login</Text>
        </View>

        <View style={styles.main}>
          <View style={styles.choicesContainer}>
            <Text style={styles.choices}>Admin</Text>
            <RadioButton
              value="admin"
              status={checked === 'admin' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('admin')}
            />
            <Text style={styles.choices}>Teacher</Text>
            <RadioButton
              value="teacher"
              status={checked === 'teacher' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('teacher')}
            />
            <Text style={styles.choices}>Student</Text>
            <RadioButton
              value="student"
              status={checked === 'student' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('student')}
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
            <Button  onPress={handleSignIn}>Sign In</Button>
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
    // justifyContent: 'center',
    alignItems: 'center',
  },
});
