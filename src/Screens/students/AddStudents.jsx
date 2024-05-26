import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'twrnc';
import { Picker } from '@react-native-picker/picker';

const AddStudents = () => {
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [dateOfAdmission, setDateOfAdmission] = useState(new Date());
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [gender, setGender] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [caste, setCaste] = useState('');
    const [occupation, setOccupation] = useState('');
    const [residence, setResidence] = useState('');
    const [admissionClass, setAdmissionClass] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remarks, setRemarks] = useState('');

    const [showDateOfAdmissionPicker, setShowDateOfAdmissionPicker] = useState(false);
    const [showDateOfBirthPicker, setShowDateOfBirthPicker] = useState(false);

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

    const showDateOfAdmissionPickerModal = () => {
        setShowDateOfAdmissionPicker(true);
    };

    const showDateOfBirthPickerModal = () => {
        setShowDateOfBirthPicker(true);
    };

    return (
        <ScrollView contentContainerStyle={tw`flex-grow bg-indigo-700 p-4`}>
            <Text style={tw`text-4xl font-bold text-center mb-8 text-white`}>Add Student</Text>
            <View style={tw`flex-row`}>
                <View style={tw`flex-1 pr-2`}>
                    <TextInput
                        style={tw`border border-gray-300 rounded-md p-2 mb-4`}
                        placeholder="Registration Number"
                        keyboardType="numeric"
                        value={registrationNumber}
                        onChangeText={setRegistrationNumber}
                    />
                    <TouchableOpacity onPress={showDateOfAdmissionPickerModal}>
                        <TextInput
                            style={tw`border border-gray-300 rounded-md p-2 mb-4`}
                            placeholder="Date of Admission/Registration"
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
                     <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue) => setGender(itemValue)}
                    >
                        <Picker.Item label="Select Gender" value="" />
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                    </Picker>
                    <TextInput
                        style={tw`border border-gray-300 rounded-md p-2 mb-4`}
                        placeholder="Father's Name"
                        value={fatherName}
                        onChangeText={setFatherName}
                    />
                    <TextInput
                        style={tw`border border-gray-300 rounded-md p-2 mb-4`}
                        placeholder="Occupation"
                        value={occupation}
                        onChangeText={setOccupation}
                    />
                    <TextInput
                        style={tw`border border-gray-300 rounded-md p-2 mb-4`}
                        placeholder="Admission Class"
                        value={admissionClass}
                        onChangeText={setAdmissionClass}
                    />
                    <TextInput
                        style={tw`border border-gray-300 rounded-md p-2 mb-4`}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={tw`flex-1 pl-2`}>
                    <TextInput
                        style={tw`border border-gray-300 rounded-md p-2 mb-4`}
                        placeholder="Name of Student"
                        value={name}
                        onChangeText={setName}
                    />
                    <TouchableOpacity onPress={showDateOfBirthPickerModal}>
                        <TextInput
                            style={tw`border border-gray-300 rounded-md p-2 mb-4`}
                            placeholder="Date of Birth"
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
                    <TextInput
                        style={tw`border border-gray-300 rounded-md p-2 mb-4`}
                        placeholder="Caste"
                        value={caste}
                        onChangeText={setCaste}
                    />
                    <TextInput
                        style={tw`border border-gray-300 rounded-md p-2 mb-4`}
                        placeholder="Residence"
                        value={residence}
                        onChangeText={setResidence}
                    />
                    <TextInput
                        style={tw`border border-gray-300 rounded-md p-2 mb-4`}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        style={tw`border border-gray-300 rounded-md p-2 mb-4`}
                        placeholder="Remarks"
                        value={remarks}
                        onChangeText={setRemarks}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={tw`bg-blue-500 p-4 rounded-md mb-4`}
                onPress={() => {} /* Handle form submission */}
            >
                <Text style={tw`text-white text-center text-lg`}>ADD</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AddStudents;