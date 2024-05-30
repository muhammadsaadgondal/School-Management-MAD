import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import tw from 'twrnc';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';

const AddFee = () => {
    const [searchStudentName, setSearchStudentName] = useState('');
    const [searchRegNo, setSearchRegNo] = useState('');
    const [student, setStudent] = useState(null);

    const [amountDue, setAmountDue] = useState('');
    const [amountPaid, setAmountPaid] = useState('');
    const [payableAmount, setPayableAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [remarks, setRemarks] = useState('');

    const handleSearch = async () => {
        try {
            const studentQuerySnapshot = await firestore()
                .collection('students')
                .where('name', '==', searchStudentName)
                .where('regNo', '==', parseInt(searchRegNo, 10))
                .get();

            if (studentQuerySnapshot.empty) {
                Alert.alert('Error', 'No student found with the provided details.');
                setStudent(null);
                return;
            }

            const studentDoc = studentQuerySnapshot.docs[0];
            setStudent({ id: studentDoc.id, ...studentDoc.data() });
        } catch (error) {
            Alert.alert('Error', 'Failed to search student. Please try again.');
        }
    };

    const handleSubmit = async () => {
        if (!student) {
            Alert.alert('Error', 'No student selected.');
            return;
        }

        try {
            const newFee = {
                datePosted: new Date(),
                dueDate: paymentDate,
                submissionDate: new Date(),
                totalDues: parseFloat(amountDue),
                paidAmount: parseFloat(amountPaid),
                payableAmount: parseFloat(payableAmount),
                status: amountPaid >= payableAmount, // Assuming status is true if paid amount is greater than or equal to payable amount
                comment: remarks,
            };

            await firestore()
                .collection('students')
                .doc(student.id)
                .update({
                    fee: firestore.FieldValue.arrayUnion(newFee),
                });

            Alert.alert('Success', 'Fee added successfully');
            // Clear the form fields
            setAmountDue('');
            setAmountPaid('');
            setPayableAmount('');
            setPaymentDate(new Date());
            setRemarks('');
            setStudent(null);
            setSearchStudentName('');
            setSearchRegNo('');
        } catch (error) {
            Alert.alert('Error', 'Failed to add fee. Please try again.');
        }
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || paymentDate;
        setShowDatePicker(false);
        setPaymentDate(currentDate);
    };

    return (
        <ScrollView contentContainerStyle={tw`flex-grow bg-indigo-700 p-4`}>
            <Text style={tw`text-4xl font-bold text-center mb-8 text-white`}>Add Fee</Text>

            <View style={tw`mb-8 p-4 bg-white rounded-md shadow-md`}>
                <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Search Student</Text>
                <TextInput
                    style={tw`border text-black border-gray-300 rounded-md p-2 mb-4`}
                    placeholder="Student Name"
                    placeholderTextColor="#A9A9A9"
                    value={searchStudentName}
                    onChangeText={setSearchStudentName}
                />
                <TextInput
                    style={tw`border text-black border-gray-300 rounded-md p-2 mb-4`}
                    placeholder="Registration Number"
                    placeholderTextColor="#A9A9A9"
                    keyboardType="numeric"
                    value={searchRegNo}
                    onChangeText={setSearchRegNo}
                />
                <TouchableOpacity
                    style={tw`bg-blue-500 p-4 rounded-md`}
                    onPress={handleSearch}
                >
                    <Text style={tw`text-white text-center text-lg`}>Search</Text>
                </TouchableOpacity>
            </View>

            {student && (
                <View style={tw`mb-8 p-4 bg-white rounded-md shadow-md`}>
                    <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Student Details</Text>
                    <Text style={tw`text-lg mb-2`}>Name: {student.name}</Text>
                    <Text style={tw`text-lg mb-2`}>Class: {student.class}</Text>
                    <Text style={tw`text-lg mb-2`}>Registration Number: {student.regNo}</Text>
                </View>
            )}

            {student && (
                <View style={tw`p-4 bg-white rounded-md shadow-md`}>
                    <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Add Fee</Text>
                    <TextInput
                        style={tw`border text-black border-gray-300 rounded-md p-2 mb-4`}
                        placeholder="Amount Due"
                        placeholderTextColor="#A9A9A9"
                        keyboardType="numeric"
                        value={amountDue}
                        onChangeText={setAmountDue}
                    />
                    <TextInput
                        style={tw`border text-black border-gray-300 rounded-md p-2 mb-4`}
                        placeholder="Amount Paid"
                        placeholderTextColor="#A9A9A9"
                        keyboardType="numeric"
                        value={amountPaid}
                        onChangeText={setAmountPaid}
                    />
                    <TextInput
                        style={tw`border text-black border-gray-300 rounded-md p-2 mb-4`}
                        placeholder="Payable Amount"
                        placeholderTextColor="#A9A9A9"
                        keyboardType="numeric"
                        value={payableAmount}
                        onChangeText={setPayableAmount}
                    />
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        style={tw`border text-black border-gray-300 rounded-md p-2 mb-4`}
                    >
                        <Text style={tw`text-black`}>{paymentDate.toDateString()}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={paymentDate}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                    <TextInput
                        style={tw`border text-black border-gray-300 rounded-md p-2 mb-4`}
                        placeholder="Remarks"
                        placeholderTextColor="#A9A9A9"
                        value={remarks}
                        onChangeText={setRemarks}
                    />
                    <TouchableOpacity
                        style={tw`bg-blue-500 p-4 rounded-md mb-4`}
                        onPress={handleSubmit}
                    >
                        <Text style={tw`text-white text-center text-lg`}>Submit</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

export default AddFee;
