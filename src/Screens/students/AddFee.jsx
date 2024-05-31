import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import tw from 'twrnc';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import StudentDetails from './StudentDetails';

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

    useEffect(() => {
        // Calculate payable amount when amount due or amount paid changes
        if (amountDue !== '' && amountPaid !== '') {
            const due = parseFloat(amountDue);
            const paid = parseFloat(amountPaid);
            const cumulativePayable = calculateCumulativePayable(student);
            const payable = Math.max(0, due - paid + cumulativePayable); // Ensure payable amount is non-negative
            setPayableAmount(payable.toString());
        }
    }, [amountDue, amountPaid, student]);

    // Function to calculate cumulative payable amount from previous fee entries
    const calculateCumulativePayable = (student) => {
        if (!student || !student.fee || student.fee.length === 0) {
            return 0;
        }

        return student.fee.reduce((accumulatedPayable, feeEntry) => {
            return accumulatedPayable + (feeEntry.payableAmount || 0);
        }, 0);
    };

    const handleSearch = async () => {
        try {
            const studentQuerySnapshot = await firestore()
                .collection('Student')
                .where('name', '==', searchStudentName)
                .where('regNo', '==', searchRegNo.trim())
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
                status: amountPaid >= payableAmount,
                comment: remarks,
            };

            await firestore()
                .collection('Student')
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
                <StudentDetails student={student} />
            )}

            {student && (
                <View style={tw`p-4 bg-white rounded-md shadow-md`}>
                    <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Add Fee</Text>
                    <TextInput
                        style={tw`border text-black border-gray-300 rounded-md p-2 mb-4`}
                        placeholder="Payable Amount"
                        placeholderTextColor="#A9A9A9"
                        keyboardType="numeric"
                        value={payableAmount}
                        onChangeText={setPayableAmount}
                        editable={false} // Make this field read-only since it's calculated
                    />
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
                        <Text style={tw`text-white text-center text-lg`}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>

    );
};

export default AddFee;

