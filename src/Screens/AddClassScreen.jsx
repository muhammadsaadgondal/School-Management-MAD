import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Icon } from 'react-native-paper';

const AddClassScreen = () => {
    const [grade, setGrade] = useState('');
    const [subjects, setSubjects] = useState('');
    const [teacher, setTeacher] = useState('');
    const [students, setStudents] = useState('');

    const handleAddClass = () => {
        if (grade === '' || subjects === '' || teacher === '' || students === '') {
            Alert.alert('Error', 'Please fill in all fields');
        } else {
            // Split subjects and students into arrays
            const subjectsArray = subjects.split(',').map(subject => subject.trim());
            const studentsArray = students.split(',').map((student, index) => ({ id: index + 1, name: student.trim() }));
            const newClass = {
                c_id: Math.max(...listedClasses.map(c => c.c_id)) + 1, // Auto-increment c_id
                grade,
                subjects: subjectsArray,
                students: studentsArray,
                teacher: { id: Math.max(...listedClasses.map(c => c.teacher.id)) + 1, name: teacher }
            };

            listedClasses.push(newClass);
            Alert.alert('Success', 'Class added successfully');
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-indigo-100`}>
            <ScrollView contentContainerStyle={tw`p-4`}>
                <View style={tw`p-4 mt-4`}>
                    <Text style={tw`text-2xl font-bold text-indigo-700 text-center`}>Add New Class</Text>
                </View>

                <View style={tw`p-4`}>
                    <Text style={tw`text-lg font-bold mb-2`}>Grade</Text>
                    <TextInput
                        style={tw`bg-white p-3 rounded-lg border border-gray-400 mb-4`}
                        placeholder="Enter Grade"
                        value={grade}
                        onChangeText={setGrade}
                    />

                    <Text style={tw`text-lg font-bold mb-2`}>Subjects (comma separated)</Text>
                    <TextInput
                        style={tw`bg-white p-3 rounded-lg border border-gray-400 mb-4`}
                        placeholder="Enter Subjects"
                        value={subjects}
                        onChangeText={setSubjects}
                    />

                    <Text style={tw`text-lg font-bold mb-2`}>Teacher's Name</Text>
                    <TextInput
                        style={tw`bg-white p-3 rounded-lg border border-gray-400 mb-4`}
                        placeholder="Enter Teacher's Name"
                        value={teacher}
                        onChangeText={setTeacher}
                    />

                    <Text style={tw`text-lg font-bold mb-2`}>Students (comma separated)</Text>
                    <TextInput
                        style={tw`bg-white p-3 rounded-lg border border-gray-400 mb-4`}
                        placeholder="Enter Students"
                        value={students}
                        onChangeText={setStudents}
                    />

                    <TouchableOpacity
                        style={tw`bg-indigo-600 p-3 rounded-lg`}
                        onPress={handleAddClass}
                    >
                        <Text style={tw`text-white text-center text-lg`}>Add Class</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddClassScreen;

// Sample listedClasses data
const listedClasses = [
    {
        c_id: 1,
        grade: "10",
        subjects: ["Math", "Science", "English"],
        students: [
            { id: 1, name: "John" },
            { id: 2, name: "Alice" },
            { id: 3, name: "Bob" }
        ],
        teacher: { id: 101, name: "Mr. Smith" }
    },
    {
        c_id: 2,
        grade: "11",
        subjects: ["Physics", "Chemistry", "Biology"],
        students: [
            { id: 4, name: "Emily" },
            { id: 5, name: "David" },
            { id: 6, name: "Sophia" }
        ],
        teacher: { id: 102, name: "Ms. Johnson" }
    }
];
