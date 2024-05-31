import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const StudentDetails = ({ student }) => {
    return (
        <View style={tw`mb-8 p-4 bg-white rounded-md shadow-md`}>
            <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Student Details</Text>
            <Text style={tw`text-lg mb-2 text-black`}>Name: <Text>{student.name}</Text></Text>
            <Text style={tw`text-lg mb-2 text-black`}>Registration Number: <Text>{student.regNo}</Text></Text>
            <Text style={tw`text-2xl font-bold text-black mb-4 text-gray-800`}>Fee History</Text>
            {student.fee.map((feeEntry, index) => (
                <View key={index} style={tw`border-b text-black border-gray-300 py-2`}>
                    <Text style={tw`text-lg text-black`}>Date Posted: <Text>{feeEntry.datePosted.toDate().toString()}</Text></Text>
                    <Text style={tw`text-lg text-black`}>Due Date: <Text>{feeEntry.dueDate.toDate().toString()}</Text></Text>
                    <Text style={tw`text-lg text-black`}>Paid Amount: <Text>{feeEntry.paidAmount}</Text></Text>
                    <Text style={tw`text-lg text-black`}>Payable Amount: <Text>{feeEntry.payableAmount}</Text></Text>
                    <Text style={tw`text-lg text-black`}>Status: <Text>{feeEntry.status ? 'Paid' : 'Unpaid'}</Text></Text>
                    <Text style={tw`text-lg text-black`}>Submission Date: <Text>{feeEntry.submissionDate.toDate().toString()}</Text></Text>
                    <Text style={tw`text-lg text-black`}>Total Dues: <Text>{feeEntry.totalDues}</Text></Text>
                    <Text style={tw`text-lg text-black`}>Comment: <Text>{feeEntry.comment}</Text></Text>
                </View>
            ))}
        </View>
    );
};

export default StudentDetails;
