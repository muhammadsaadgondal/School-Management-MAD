import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import { IconButton, Avatar, Portal, Modal, Provider as PaperProvider, Icon } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePickerModal from "react-native-image-picker-modal";
import tw from 'twrnc';
import { PieChart } from 'react-native-gifted-charts';

import { TalecTable } from "talec-table";
import FancyTable from 'react-native-fancy-table';



const detail = {
    c_id: 1,
    grade: "10",
    subjects: ["Math", "Science", "English", "Physics", "Chemistry", "Biology"],
    students: [
        { id: 1, name: "John Cena", age: 15, reg_no: "101", attendance: "85%", gender: "male" },
        { id: 2, name: "Muhammad Saad Gondal", age: 16, reg_no: "102", attendance: "90%", gender: "male" },
        { id: 3, name: "Bob", age: 15, reg_no: "103", attendance: "88%", gender: "male" },
        { id: 4, name: "Charlie", age: 16, reg_no: "104", attendance: "92%", gender: "female" },
        { id: 5, name: "David", age: 15, reg_no: "105", attendance: "80%", gender: "female" },
    ],
    teacher: { id: 101, name: "Mr. Smith" }
};
const maleCount = detail.students.filter(student => student.gender === 'male').length;
const femaleCount = detail.students.filter(student => student.gender === 'female').length;

const data = [
    { value: maleCount, label: 'Male', color: '#2E86C1' },
    { value: femaleCount, label: 'Female', color: '#F1948A' },
];


const header = ["Name", "Age", "Reg No", "Attendance"];

const ClassDetail = () => {
    const [isVisible, setVisible] = useState(false);
    const [syllabusImage, setSyllabusImage] = useState(null);
    const [visibleP, setVisibleP] = useState(false);

    const showModal = () => setVisibleP(true);
    const hideModal = () => setVisibleP(false);

    const pickImage = () => {
        setVisible(true); // Show the image picker modal
    };

    const deleteImage = () => {
        setSyllabusImage(null); // Clear the selected image
    };

    const handleImageSelected = (imageUri) => {
        setSyllabusImage(imageUri); // Set the selected image URI
        setVisible(false); // Hide the modal after selecting an image
    };

    return (
        <SafeAreaView style={tw`h-full bg-indigo-100 p-4`}>
            <ScrollView contentContainerStyle={tw`flex-grow `} showsVerticalScrollIndicator={false}  >
                <PaperProvider>
                    {/* Class Name */}
                    <View style={tw`mb-4`}>
                        <Text style={tw`text-2xl font-bold text-center`}>{detail.grade}th Grade</Text>
                    </View>

                    {/* Teacher Details */}
                    <View style={tw`bg-white p-4 rounded-lg shadow-lg mb-4`}>
                        <View style={tw`flex-row items-center`}>
                            <Avatar.Image
                                size={50}
                                source={{ uri: 'https://via.placeholder.com/150' }}
                                style={tw`mr-4`}
                            />
                            <View style={tw`flex-1`}>
                                <Text style={tw`text-lg font-bold`}>{detail.teacher.name}</Text>
                                <Text>Teacher</Text>
                            </View>
                            <IconButton
                                icon="information"
                                color={tw.color('indigo-700')}
                                size={25}
                                onPress={() => console.log('Info Pressed')}
                            />
                        </View>
                    </View>
                    {/* Gender Ratio Chart */}
                    <View style={tw`bg-white p-4 rounded-lg shadow-lg mb-4 items-center`}>
                        <Text style={tw`text-xl font-bold mb-2`}>Gender Ratio</Text>
                        <PieChart
                            data={data.map((item) => ({
                                ...item,
                                text: `${item.label}: ${item.value}`,
                                textColor: 'black',
                                showText: true,
                                textSize: 12,
                            }))}
                            donut
                            innerRadius={50}
                            centerLabelComponent={() => {
                                return (
                                    <Text style={tw`font-bold `}>
                                        Male: {maleCount} {'\n'}
                                        Female: {femaleCount}
                                    </Text>
                                );
                            }}
                        />
                    </View>


                    {/* Students Section */}
                    <View style={tw`bg-white p-4 rounded-lg shadow-lg mb-4`}>
                        <Text style={tw`text-xl font-bold mb-2`}>Students</Text>
                        <View style={{ flexDirection: 'column', flex: 0 }}>
                            <FancyTable
                                headerBGColor={tw.color("indigo-400")}
                                headerFontColor="white"
                                headerFontSize={15}
                                bodyFontSize={13}
                                bodyFontColor="black"
                                header={header}
                                tableBody={detail.students.slice(0, 3).map(({ id, ...rest }) => rest)}
                                rowWidth={4.8}
                                borderColor={tw.color("indigo-400")}
                                borderWidth={0.2}
                                tableHeight={5}
                            />
                        </View>


                        <Portal>
                            <Modal visible={visibleP} onDismiss={hideModal} contentContainerStyle={tw` bg-white p-4 items-center justify-center`}>

                                <Text style={tw`text-xl font-bold mb-2 items-center justify-center`}>All Students</Text>

                                <FancyTable
                                    headerBGColor={tw.color("indigo-400")}
                                    headerFontColor="white"
                                    headerFontSize={15}
                                    bodyFontSize={13}
                                    bodyFontColor="black"
                                    header={header}
                                    tableBody={detail.students.map(({ id, ...rest }) => rest)}
                                    rowWidth={5}
                                    borderColor={tw.color("indigo-400")}
                                    borderWidth={0}
                                />

                            </Modal>
                        </Portal>
                        <TouchableOpacity style={tw`mt-4`} onPress={showModal}>
                            <Text style={tw`text-blue-600`}>Show more</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Subjects */}
                    <View style={tw`bg-white p-4 rounded-lg shadow-lg mb-4`}>
                        <Text style={tw`text-xl font-bold mb-2`}>Subjects</Text>
                        {chunkArray(detail.subjects, 3).map((rowSubjects, rowIndex) => (
                            <View key={rowIndex} style={tw`flex flex-row justify-center items-center`}>
                                {rowSubjects.map((subject, subjectIndex) => (
                                    <TouchableOpacity key={subjectIndex} style={tw`bg-indigo-200 px-3 py-2 rounded-full mr-2 mb-2`}>
                                        <Text style={tw`text-indigo-800`}>{subject}</Text>
                                    </TouchableOpacity>
                                ))}
                                {rowSubjects.length < 3 && (
                                    <View style={tw`flex-grow`} />
                                )}
                            </View>
                        ))}
                    </View>




                    {/* Syllabus Upload Section */}
                    <View style={tw`bg-white p-4 rounded-lg shadow-lg mb-4`}>
                        <Text style={tw`text-xl font-bold mb-2`}>Syllabus</Text>
                        {syllabusImage ? (
                            <View style={tw`relative items-center justify-center`}>
                                <Image
                                    source={{ uri: syllabusImage }}
                                    style={tw`w-80 h-50 rounded-lg`}
                                />
                                <IconButton
                                    icon="close-circle"
                                    iconColor='white'
                                    size={25}
                                    style={tw`absolute top--3 right--2  rounded-full`}
                                    onPress={deleteImage}
                                />
                                {/* <Icon source="close-circle" size={25} color="black" style={tw` relative top-10 bg-indigo-200 `} onPress={deleteImage} /> */}
                            </View>
                        ) : (
                            <TouchableOpacity style={tw`bg-indigo-600 p-3 rounded-lg w-full`} onPress={pickImage} >
                                <Text style={tw`text-white text-center`}>Upload Syllabus</Text>
                            </TouchableOpacity>
                        )}
                        <ImagePickerModal
                            title="You can either take a picture or select one from your album."
                            data={["Take a photo", "Select from the library"]}
                            isVisible={isVisible}
                            onCancelPress={() => {
                                setVisible(false);
                            }}
                            onBackdropPress={() => {
                                setVisible(false);
                            }}
                            onPress={(item) => {
                                // Handle the selected item
                                setVisible(false); // Hide the modal
                                handleImageSelected(item.assets[0].uri); // Set the URI of the selected image from the gallery
                            }}
                        />
                    </View>

                    {/* Manage Class Button */}
                    <View style={tw`relative bottom-0 left-0 right-0 p-4`}>
                        <TouchableOpacity
                            style={tw`bg-indigo-600 p-3 rounded-lg w-full`}
                            onPress={() => console.log('Manage Class Pressed')}
                        >
                            <Text style={tw`text-white text-center`}>Manage Classroom</Text>
                        </TouchableOpacity>
                    </View>

                </PaperProvider>
            </ScrollView>
        </SafeAreaView>
    );
};

function chunkArray(arr, chunkSize) {
    return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (_, index) =>
        arr.slice(index * chunkSize, index * chunkSize + chunkSize)
    );
}

export default ClassDetail;
