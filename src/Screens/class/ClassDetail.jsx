import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import { IconButton, Avatar, Portal, Modal, Provider as PaperProvider, Icon } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import {  launchImageLibrary } from 'react-native-image-picker';
import tw from 'twrnc';
import { PieChart } from 'react-native-gifted-charts';

import FancyTable from 'react-native-fancy-table';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import CustomImagePickerModal from '../../Components/CustomImagePickerModal';



const uploadImageAndAddToFirestore = async (imageUri, imageName, classId) => {
    console.log("Inside");
    const storageReference = storage().ref(`images/${imageName}`);
    const selectedClass = firestore().collection('Class').doc(classId);
    console.log(`ClassRef got ${selectedClass}`);

    try {
        const uploadTask = storageReference.putFile(imageUri);

        // This promise resolves when the upload is complete
        await new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                taskSnapshot => {
                    console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                },
                error => {
                    console.error('Error during upload:', error);
                    reject(error);
                },
                () => {
                    console.log('Upload completed successfully');
                    resolve();
                }
            );
        });

        // After the upload completes, get the download URL
        const downloadUrl = await storageReference.getDownloadURL();
        console.log('Image uploaded successfully! Download URL:', downloadUrl);

        // Update Firestore document with image URL
        await selectedClass.update({
            syllabusUrl: downloadUrl,
        });

        console.log('Image URL added to Firestore document!');
    } catch (error) {
        console.error('Error uploading image and updating Firestore:', error);
    }
};


const header = ["Name", "Reg No", "Date of Birth", "Gender"];

const ClassDetail = ({ route }) => {

    /* ClassDetail */
    const { classInfo, navigation, students, teacherInfo } = route.params;
    const [detail, setDetail] = useState(classInfo);

    // console.log(detail);
    // console.log("===========================");
    const maleCount = students.filter(student => student.gender === 'male').length;
    const femaleCount = students.filter(student => student.gender === 'female').length;

    const data = [
        { value: maleCount, label: 'Male', color: '#2E86C1' },
        { value: femaleCount, label: 'Female', color: '#F1948A' },
    ];

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

    const handleImageSelection = async () => {

        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                console.log(imageUri);
                setSyllabusImage(imageUri);
                uploadImageAndAddToFirestore(imageUri, `syllabus_${detail.id}.jpg`, detail.id);
            }
        });

    };

    return (
        <SafeAreaView style={tw`h-full bg-indigo-100 p-4`}>
            <ScrollView contentContainerStyle={tw`flex-grow `} showsVerticalScrollIndicator={false}  >
                <PaperProvider>
                    {/* Class Name */}
                    <View style={tw`mb-4`}>
                        <Text style={tw`text-2xl font-bold text-center`}>{detail.id}th Grade</Text>
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
                                <Text style={tw`text-lg font-bold`}>{teacherInfo.name}</Text>
                                <Text>Teacher</Text>
                            </View>
                            <IconButton
                                icon="information"
                                color={tw.color('indigo-700')}
                                size={25}
                                onPress={() => navigation.navigate('Profile', { profileData: teacherInfo, profileType: 'teacher', gradeTeaching: detail.id })}
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
                                tableBody={students.map(({ id, name, regNo, DoB, gender }) => [name, regNo, new Date(DoB).toLocaleDateString(), gender])}
                                rowWidth={4.8}
                                borderColor={tw.color("indigo-400")}
                                borderWidth={0.2}
                                tableHeight={5}
                            />
                        </View>


                        <Portal>
                            <Modal visible={visibleP} onDismiss={hideModal} contentContainerStyle={tw` bg-white p-4 items-center justify-center max-h-230`}>
                                <Text style={tw`text-xl font-bold mb-2 items-center justify-center`}>All Students</Text>
                                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                    <FancyTable
                                        headerBGColor={tw.color("indigo-400")}
                                        headerFontColor="white"
                                        headerFontSize={15}
                                        bodyFontSize={13}
                                        bodyFontColor="black"
                                        header={header}
                                        tableBody={students.map(({ id, name, regNo, DoB, gender }) => [name, regNo, new Date(DoB).toLocaleDateString(), gender])}
                                        rowWidth={5}
                                        borderColor={tw.color("indigo-400")}
                                        borderWidth={0.2}
                                        tableHeight={1}
                                    />
                                </ScrollView>
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
                            <View key={rowIndex} style={tw`flex flex-row justify-start items-center`}>
                                {rowSubjects.map((subject, subjectIndex) => (
                                    <TouchableOpacity key={subjectIndex} style={tw`bg-indigo-200 px-1.5 py-1 rounded-full mr-2 mb-2`} onPress={() => console.log(subject)}>
                                        <Text style={tw`text-indigo-800`} numberOfLines={1} ellipsizeMode='tail'>{subject}</Text>
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
                            <TouchableOpacity style={tw`bg-indigo-600 p-3 rounded-lg w-full`} onPress={handleImageSelection} >
                                <Text style={tw`text-white text-center`}>Upload Syllabus</Text>
                            </TouchableOpacity>
                        )}

                    </View>

                    {/* Manage Class Button */}
                    <View style={tw`relative bottom-0 left-0 right-0 p-4`}>
                        <TouchableOpacity
                            style={tw`bg-indigo-600 p-3 rounded-lg w-full`}
                            onPress={() => navigation.navigate('RegisterScreen', { classInfo, navigation })}
                        >
                            <Text style={tw`text-white text-center`}>Update Classroom</Text>
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
