import React, { useState, useEffect } from 'react';
import { Alert, View, Text, TouchableOpacity, TextInput, ScrollView, Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'twrnc';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';

const AddStudentsforupdate = ({ studentData, onUpdate }) => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [dateOfAdmission, setDateOfAdmission] = useState(new Date());
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [caste, setCaste] = useState('');
  const [occupation, setOccupation] = useState('');
  const [residence, setResidence] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remarks, setRemarks] = useState('');

  const [showDateOfAdmissionPicker, setShowDateOfAdmissionPicker] = useState(false);
  const [showDateOfBirthPicker, setShowDateOfBirthPicker] = useState(false);

  useEffect(() => {
    if (studentData) {
      setRegistrationNumber(studentData.regNo.toString());
      setDateOfAdmission(new Date(studentData.DoA));
      setName(studentData.name);
      setDateOfBirth(new Date(studentData.DoB));
      setGender(studentData.gender);
      setFatherName(studentData.father.name);
      setCaste(studentData.father.caste);
      setOccupation(studentData.father.occupation);
      setResidence(studentData.father.residency);
      setEmail(studentData.email);
      setPassword(studentData.loginCred.password);
      setRemarks(studentData.remarks.join(', '));
    }
  }, [studentData]);

  const handleDateOfAdmissionChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfAdmission;
    setShowDateOfAdmissionPicker(Platform.OS === 'ios');
    setDateOfAdmission(currentDate);
  };

  const handleDateOfBirthChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDateOfBirthPicker(Platform.OS === 'ios');
    setDateOfBirth(currentDate);
  };

  const handleUpdate = async () => {
    try {
      await onUpdate({
        regNo: parseInt(registrationNumber, 10),
        name,
        DoA: dateOfAdmission,
        DoB: dateOfBirth,
        gender,
        father: {
          name: fatherName,
          occupation,
          caste,
          residency: residence,
        },
        loginCred: {
          regNo: registrationNumber,
          password,
        },
        remarks: [],
        fee: [],
        session: [],
      });
      Alert.alert('Success', 'Student updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update student. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={tw`flex-grow bg-indigo-700 p-4`}>
          <Text style={tw`text-4xl font-bold text-center mb-8 text-white`}>Update Student</Text>
          <View style={tw`bg-white p-4 rounded-md shadow-md`}>
            <Text style={tw`text-xl font-bold mb-4 text-gray-800`}>Student Information</Text>
            <View style={tw`flex-row`}>
              <View style={tw`flex-1 pr-2`}>
                <TextInput
                  style={tw`border border-gray-300 text-black rounded-md p-2 mb-2`}
                  placeholder="Registration Number"
                  placeholderTextColor="gray"
                  keyboardType="numeric"
                  value={registrationNumber}
                  onChangeText={setRegistrationNumber}
                />
                <TouchableOpacity onPress={() => setShowDateOfAdmissionPicker(true)}>
                  <Text style={tw`text-xs font-bold pl-1 text-gray-800`}>DOA</Text>
                  <TextInput
                    style={tw`border border-gray-300 text-black rounded-md p-2 mb-2`}
                    placeholder="Date of Admission/Registration"
                    placeholderTextColor="gray"
                    value={dateOfAdmission.toDateString()}
                    editable={false}
                  />
                </TouchableOpacity>
                {showDateOfAdmissionPicker && (
                  <DateTimePicker
                    testID="dateOfAdmissionPicker"
                    value={dateOfAdmission}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateOfAdmissionChange}
                  />
                )}
                <Text style={tw`text-md font-bold pl-1 text-gray-800`}>Select Gender</Text>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => setGender(itemValue)}
                  style={tw`border border-gray-300 rounded-md mb-4 text-black`}
                >
                  <Picker.Item label="Select Gender" value="" />
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                </Picker>
              </View>
              <View style={tw`flex-1 pl-2`}>
                <TextInput
                  style={tw`border border-gray-300 text-black rounded-md p-2 mb-4`}
                  placeholder="Name of Student"
                  placeholderTextColor="gray"
                  value={name}
                  onChangeText={setName}
                />
                <TouchableOpacity onPress={() => setShowDateOfBirthPicker(true)}>
                  <Text style={tw`text-xs font-bold pl-1 text-gray-800`}>DOB</Text>
                  <TextInput
                    style={tw`border border-gray-300 text-black rounded-md p-2 mb-4`}
                    placeholder="Date of Birth"
                    placeholderTextColor="gray"
                    value={dateOfBirth.toDateString()}
                    editable={false}
                  />
                </TouchableOpacity>
                {showDateOfBirthPicker && (
                  <DateTimePicker
                    testID="dateOfBirthPicker"
                    value={dateOfBirth}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateOfBirthChange}
                  />
                )}
              </View>
            </View>

            <Text style={tw`text-xl font-bold mt-4 mb-4 text-gray-800`}>Father's Information</Text>
            <View style={tw`flex-row`}>
              <View style={tw`flex-1 pr-2`}>
                <TextInput
                  style={tw`border border-gray-300 text-black rounded-md p-2 mb-4`}
                  placeholder="Father's Name"
                  placeholderTextColor="gray"
                  value={fatherName}
                  onChangeText={setFatherName}
                />
                <TextInput
                  style={tw`border border-gray-300 text-black rounded-md p-2 mb-4`}
                  placeholder="Caste"
                  placeholderTextColor="gray"
                  value={caste}
                  onChangeText={setCaste}
                />
              </View>
              <View style={tw`flex-1 pl-2`}>
                <TextInput
                  style={tw`border border-gray-300 text-black rounded-md p-2 mb-4`}
                  placeholder="Occupation"
                  placeholderTextColor="gray"
                  value={occupation}
                  onChangeText={setOccupation}
                />
                <TextInput
                  style={tw`border border-gray-300 text-black rounded-md p-2 mb-4`}
                  placeholder="Residence"
                  placeholderTextColor="gray"
                  value={residence}
                  onChangeText={setResidence}
                />
              </View>
            </View>

            <Text style={tw`text-xl font-bold mt-4 mb-4 text-gray-800`}>Login Credentials</Text>
            <TextInput
              style={tw`border border-gray-300 text-black rounded-md p-2 mb-4`}
              placeholder="Email"
              placeholderTextColor="gray"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={tw`border border-gray-300 text-black rounded-md p-2 mb-4`}
              placeholder="Password"
              placeholderTextColor="gray"
              value={password}
              onChangeText={setPassword}
            />

            <Text style={tw`text-xl font-bold mt-4 mb-4 text-gray-800`}>Remarks</Text>
            <TextInput
              style={tw`border border-gray-300 text-black rounded-md p-2 mb-4`}
              placeholder="Remarks"
              placeholderTextColor="gray"
              value={remarks}
              onChangeText={setRemarks}
            />

            <TouchableOpacity
              style={tw`bg-indigo-600 py-3 mt-4 rounded-md`}
              onPress={handleUpdate}
            >
              <Text style={tw`text-white text-center font-bold text-lg`}>Update Student</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddStudentsforupdate;

