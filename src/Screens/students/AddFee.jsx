import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';

const AddFee = () => {
    const [studentName, setStudentName] = useState('');
    const [amountDue, setAmountDue] = useState('');
    const [amountPaid, setAmountPaid] = useState('');
    const [payableAmount, setPayableAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [remarks, setRemarks] = useState('');
    const [lateFees, setLateFees] = useState(false); // Default to false

    const handleSubmit = () => {
        // Here you can handle form submission logic
        // For now, just log the form data
        console.log({
            studentName,
            amountDue,
            amountPaid,
            payableAmount,
            paymentDate,
            lateFees,
            remarks
        });
    };

    return (
        <ScrollView contentContainerStyle={tw`flex-grow bg-indigo-700 p-4`}>
            <Text style={tw`text-4xl font-bold text-center mb-8 text-black`}>Add Fee</Text>
            <TextInput
                style={tw`border border-gray-300 rounded-md p-2 mb-4`}
                placeholder="Student Name"
                value={studentName}
                onChangeText={setStudentName}
            />
            <TextInput
                style={tw`border border-gray-300 rounded-md p-2 mb-4`}
                placeholder="Amount Due"
                keyboardType="numeric"
                value={amountDue}
                onChangeText={setAmountDue}
            />
            <TextInput
                style={tw`border border-gray-300 rounded-md p-2 mb-4`}
                placeholder="Amount Paid"
                keyboardType="numeric"
                value={amountPaid}
                onChangeText={setAmountPaid}
            />
            <TextInput
                style={tw`border border-gray-300 rounded-md p-2 mb-4`}
                placeholder="Payable Amount"
                keyboardType="numeric"
                value={payableAmount}
                onChangeText={setPayableAmount}
            />
            <TextInput
                style={tw`border border-gray-300 rounded-md p-2 mb-4`}
                placeholder="Payment Date"
                value={paymentDate}
                onChangeText={setPaymentDate}
            />
            <TextInput
                style={tw`border border-gray-300 rounded-md p-2 mb-4`}
                placeholder="Remarks"
                value={remarks}
                onChangeText={setRemarks}
            />
            <TouchableOpacity
                style={tw`bg-blue-500 p-4 rounded-md mb-4`}
                onPress={handleSubmit}
            >
                <Text style={tw`text-white text-center text-lg`}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AddFee;
