import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { DataTable, IconButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';

const UpdateStudent = () => {
    const [studentName, setStudentName] = useState('');
    const [students, setStudents] = useState([]);
    const [editingStudentId, setEditingStudentId] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedAge, setUpdatedAge] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [dateOfAdmission, setDateOfAdmission] = useState(new Date());
    const [showDateOfAdmissionPicker, setShowDateOfAdmissionPicker] = useState(false);
    const [gender, setGender] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [occupation, setOccupation] = useState('');
    const [admissionClass, setAdmissionClass] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [showDateOfBirthPicker, setShowDateOfBirthPicker] = useState(false);
    const [caste, setCaste] = useState('');
    const [residence, setResidence] = useState('');
    const [password, setPassword] = useState('');
    const [remarks, setRemarks] = useState('');

    const searchStudent = async () => {
        try {
            const studentSnapshot = await firestore()
                .collection('Student')
                .where('name', '==', studentName)
                .get();
            if (!studentSnapshot.empty) {
                const studentData = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setStudents(studentData);
            } else {
                Alert.alert('Student not found');
            }
        } catch (error) {
            Alert.alert('Error fetching student', error.message);
        }
    };

    const deleteStudent = async (id) => {
        try {
            await firestore().collection('students').doc(id).delete();
            setStudents(students.filter(student => student.id !== id));
            Alert.alert('Student deleted successfully');
        } catch (error) {
            Alert.alert('Error deleting student', error.message);
        }
    };

    const updateStudent = async (id) => {
        try {
            await firestore().collection('Student').doc(id).update({
                name: updatedName,
                age: parseInt(updatedAge, 10),
                "registrationNumber": registrationNumber,
                "DoA": dateOfAdmission, // Assuming "DoA" is the field name in Firestore
                gender: gender,
                "father.name": fatherName, // Example of updating nested field
                occupation: occupation,
                // Update other fields accordingly
            });
            setStudents(students.map(student => student.id === id ? { ...student, name: updatedName, age: parseInt(updatedAge, 10) } : student));
            setEditingStudentId(null);
            Alert.alert('Student updated successfully');
        } catch (error) {
            Alert.alert('Error updating student', error.message);
        }
    };


    const startEditing = (student) => {
        if (student.id) { // Check if 'id' property exists
            setEditingStudentId(student.id);
            setUpdatedName(student.name);
            setUpdatedAge(student.age ? student.age.toString() : '');
            setRegistrationNumber(student.registrationNumber || '');
            setDateOfAdmission(student.dateOfAdmission ? new Date(student.dateOfAdmission.seconds * 1000) : new Date());
            setGender(student.gender || '');
            setFatherName(student.fatherName || '');
            setOccupation(student.occupation || '');
            setAdmissionClass(student.admissionClass || '');
            setEmail(student.email || '');
            setDateOfBirth(student.dateOfBirth ? new Date(student.dateOfBirth.seconds * 1000) : new Date());
            setCaste(student.caste || '');
            setResidence(student.residence || '');
            setPassword(student.password || '');
            setRemarks(student.remarks || '');
        } else {
            console.error("Student object does not contain an 'id' property:", student);
        }
    };
    

    const handleDateOfAdmissionChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateOfAdmission;
        setShowDateOfAdmissionPicker(false);
        setDateOfAdmission(currentDate);
    };

    const handleDateOfBirthChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateOfBirth;
        setShowDateOfBirthPicker(false);
        setDateOfBirth(currentDate);
    };

    return (
        < ScrollView>
            <View style={tw`flex-1 p-4 bg-indigo-400`}>
                <Text style={tw`text-2xl font-bold mb-4`}>Update Student</Text>
                <TextInput
                    style={tw`border p-2 mb-4`}
                    placeholder="Enter Student Name"
                    value={studentName}
                    onChangeText={setStudentName}
                />
                <Button title="Search Student" onPress={searchStudent} />

                {students.length > 0 && (
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Name</DataTable.Title>
                            <DataTable.Title>Age</DataTable.Title>
                            <DataTable.Title>Actions</DataTable.Title>
                        </DataTable.Header>
                        {students.map(student => (
                            <DataTable.Row key={student.id}>
                                <DataTable.Cell>
                                    {editingStudentId === student.id ? (
                                        <TextInput
                                            style={tw`border p-2`}
                                            value={updatedName}
                                            onChangeText={setUpdatedName}
                                        />
                                    ) : (
                                        <Text>{student.name}</Text>
                                    )}
                                </DataTable.Cell>
                                <DataTable.Cell>
                                    {editingStudentId === student.id ? (
                                        <TextInput
                                            style={tw`border p-2`}
                                            value={updatedAge}
                                            onChangeText={setUpdatedAge}
                                            keyboardType="numeric"
                                        />
                                    ) : (
                                        <Text>{student.age}</Text>
                                    )}
                                </DataTable.Cell>
                                <DataTable.Cell>
                                    {editingStudentId === student.id ? (
                                        <Button title="Save" onPress={() => updateStudent(student.id)} />
                                    ) : (
                                        <>
                                            <IconButton icon="pencil" onPress={() => startEditing(student)} />
                                            <IconButton icon="delete" onPress={() => deleteStudent(student.id)} />
                                        </>
                                    )}
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                )}

                {editingStudentId && (
                    <View>
                        <View style={tw`flex-row`}>
                            <View style={tw`flex-1 pr-2`}>
                                <TextInput
                                    style={tw`border border-gray-300 rounded-md p-2 mb-4`}
                                    placeholder="Registration Number"
                                    keyboardType="numeric"
                                    value={registrationNumber}
                                    onChangeText={setRegistrationNumber}
                                />
                                <TouchableOpacity onPress={() => setShowDateOfAdmissionPicker(true)}>
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
                                    value={updatedName}
                                    onChangeText={setUpdatedName}
                                />
                                <TouchableOpacity onPress={() => setShowDateOfBirthPicker(true)}>
                                    <TextInput
                                        style={tw`border                  border-gray-300 rounded-md p-2 mb-4`}
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
                            onPress={() => updateStudent(editingStudentId)}
                        >
                            <Text style={tw`text-white text-center text-lg`}>Save</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default UpdateStudent;

