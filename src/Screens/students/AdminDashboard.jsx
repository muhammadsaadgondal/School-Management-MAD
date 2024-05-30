import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import firestore from '@react-native-firebase/firestore';

const AdminDashboard = () => {
    const navigation = useNavigation();
    const [studentCount, setStudentCount] = useState(0);
    const [teacherCount, setTeacherCount] = useState(0);
    const [totalRecovery, setTotalRecovery] = useState(0);
    const [totalPay, setTotalPay] = useState(0);

    useEffect(() => {
        // Fetch student count
        const fetchStudentCount = async () => {
            try {
                const studentSnapshot = await firestore().collection('Student').get();
                setStudentCount(studentSnapshot.size);
            } catch (error) {
                console.error('Error fetching student count: ', error);
            }
        };

        // Fetch teacher count
        const fetchTeacherCount = async () => {
            try {
                const teacherSnapshot = await firestore().collection('Teacher').get();
                setTeacherCount(teacherSnapshot.size);
            } catch (error) {
                console.error('Error fetching teacher count: ', error);
            }
        };

        // Fetch total recovery from student fees
        const fetchTotalRecovery = async () => {
            try {
                const studentSnapshot = await firestore().collection('Student').get();
                let totalRecoveryAmount = 0;
                studentSnapshot.forEach((doc) => {
                    const studentData = doc.data();
                    if (studentData.fee && studentData.fee.length > 0) {
                        studentData.fee.forEach((feeEntry) => {
                            totalRecoveryAmount += feeEntry.payableAmount || 0;
                        });
                    }
                });
                setTotalRecovery(totalRecoveryAmount);
            } catch (error) {
                console.error('Error fetching total recovery: ', error);
            }
        };

        // Fetch total pay for teachers
        const fetchTotalPay = async () => {
            try {
                const teacherSnapshot = await firestore().collection('Teacher').get();
                let totalPayAmount = 0;
                teacherSnapshot.forEach((doc) => {
                    const teacherData = doc.data();
                    totalPayAmount += teacherData.pay || 0;
                });
                setTotalPay(totalPayAmount);
            } catch (error) {
                console.error('Error fetching total pay: ', error);
            }
        };

        fetchStudentCount();
        fetchTeacherCount();
        fetchTotalRecovery();
        fetchTotalPay();
    }, []);

    return (
        <ScrollView style={tw`flex-1 p-4 bg-white`}>
            <Text style={tw`text-4xl font-bold text-center mb-8 text-black`}>Dashboard</Text>

            <View style={tw`flex-row justify-between mb-8`}>
                <View style={tw`w-5/12 bg-gray-200 p-4 rounded`}>
                    <Text style={tw`text-lg text-gray-600`}>Students</Text>
                    <Text style={tw`text-3xl font-bold text-black`}>{studentCount}</Text>
                </View>
                <View style={tw`w-5/12 bg-gray-200 p-4 rounded`}>
                    <Text style={tw`text-lg text-gray-600`}>Teachers</Text>
                    <Text style={tw`text-3xl font-bold text-black`}>{teacherCount}</Text>
                </View>
            </View>

            <View style={tw`flex-row justify-between mb-8`}>
                <View style={tw`w-5/12 bg-gray-200 p-4 rounded`}>
                    <Text style={tw`text-lg text-gray-600`}>Recovery</Text>
                    <Text style={tw`text-3xl font-bold text-black`}>{totalRecovery}</Text>
                </View>
                <View style={tw`w-5/12 bg-gray-200 p-4 rounded`}>
                    <Text style={tw`text-lg text-gray-600`}>Total Pay</Text>
                    <Text style={tw`text-3xl font-bold text-black`}>{totalPay}</Text>
                </View>
            </View>

            <Text style={tw`text-2xl font-bold mb-4 text-black`}>Announcements</Text>
            {/* Announcement components */}
            {/* Replace the following TouchableOpacity components with your actual announcement components */}
            <TouchableOpacity style={tw`flex-row items-center mb-4`}>
                <Image
                    style={tw`w-12 h-12 rounded-full mr-4`}
                    source={{ uri: 'https://placekitten.com/200/200' }}
                />
                <View>
                    <Text style={tw`text-lg font-bold text-black`}>New feature: Report...</Text>
                    <Text style={tw`text-gray-600`}>Published by Rebecca 2d ago</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={tw`flex-row items-center mb-8`}>
                <Image
                    style={tw`w-12 h-12 rounded-full mr-4`}
                    source={{ uri: 'https://placekitten.com/200/200' }}
                />
                <View>
                    <Text style={tw`text-lg font-bold text-black`}>Happy Teacher's Day!</Text>
                    <Text style={tw`text-gray-600`}>Published by John 7d ago</Text>
                </View>
            </TouchableOpacity>

            <Text style={tw`text-2xl font-bold mb-4 text-black`}>Reports</Text>
            {/* Report generation buttons */}
            <TouchableOpacity
                style={tw`bg-indigo-700 p-4 rounded mb-4`}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('GenerateStudentReport')}
            >
                <Text style={tw`text-white text-center text-lg`}>Generate Student Report</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={tw`bg-indigo-700 p-4 rounded mb-8`}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('GenerateTeacherReport')}
            >
                <Text style={tw`text-white text-center text-lg`}>Generate Teacher Report</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AdminDashboard;
