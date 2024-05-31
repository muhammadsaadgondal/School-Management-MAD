import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, Alert, StyleSheet, ScrollView, PermissionsAndroid, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import ImageResizer from '@bam.tech/react-native-image-resizer';


const Timetable = () => {
  const [imageURI, setImageURI] = useState(null);
  const [description, setDescription] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestPermissions();
    }
  }, []);

  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);

      if (
        granted['android.permission.CAMERA'] !== PermissionsAndroid.RESULTS.GRANTED ||
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED ||
        granted['android.permission.READ_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        Alert.alert('Permissions required', 'Please grant the necessary permissions');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo' });

      console.log('Image picker result:', result);

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorMessage) {
        Alert.alert('Error', result.errorMessage);
      } else if (result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        console.log('Image URI:', uri);
        setImageURI(uri);
      } else {
        console.log('No assets found in result');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const uploadImage = async () => {
    if (!imageURI) {
      Alert.alert('Validation', 'Please pick an image first');
      return;
    }

    try {
      const resizedImage = await ImageResizer.createResizedImage(imageURI, 800, 600, 'JPEG', 80);
      const uri = resizedImage.uri;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const storageRef = storage().ref(`images/${filename}`);

      const uploadTask = storageRef.putFile(uri);
      console.log('clicked on imagea upload')

      uploadTask.on('state_changed', {
        next: snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          console.log('Upload is ' + progress + '% done');
        },
        error: error => {
          console.error('Error uploading image:', error);
          Alert.alert('Error', 'Failed to upload image');
        },
        complete: async () => {
          try {
            const downloadURL = await storageRef.getDownloadURL();
            await firestore().collection('images').add({
              url: downloadURL,
              description,
              timestamp: firestore.FieldValue.serverTimestamp(),
            });
            setUploadProgress(0); // Reset progress after completion
            console.log(uploadProgress)
            Alert.alert('Success', 'Image uploaded successfully');
          } catch (error) {
            console.error('Error saving image metadata:', error);
            Alert.alert('Error', 'Failed to save image metadata');
          }
        }
      });
    } catch (error) {
      console.error('Error resizing or uploading image:', error);
      Alert.alert('Error', 'Failed to resize or upload image');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Button title="Pick Image Here" onPress={pickImage} />
        {imageURI && <Image source={{ uri: imageURI }} style={{ width: 200, height: 200, marginVertical: 20 }} />}
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
        />
        <Button title="Upload Image Here" onPress={uploadImage} />
        {uploadProgress > 0 && (
          <Text>Upload Progress: {uploadProgress.toFixed(2)}%</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default Timetable;