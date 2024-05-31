import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { IconButton, Avatar, Portal, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';
import tw from 'twrnc';
import { PieChart } from 'react-native-gifted-charts';
import FancyTable from 'react-native-fancy-table';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { getClass } from './ProfileScreen';

const header = ["Name", "Reg No", "Date of Birth", "Gender"];

const ClassDetail = ({ route, navigation }) => {
    const { classInfo, students, teacherInfo } = route.params;
    const [detail, setDetail] = useState(classInfo);
    const maleCount = students.filter(student => student.gender === 'male').length;
    const femaleCount = students.filter(student => student.gender === 'female').length;

    const data = [
        { value: maleCount, label: 'Male', color: '#2E86C1' },
        { value: femaleCount, label: 'Female', color: '#F1948A' },
    ];

    const [isVisible, setVisible] = useState(false);
    const [syllabusImage, setSyllabusImage] = useState(null);
    const [timetableImage, setTimetableImage] = useState(null);
    const [visibleP, setVisibleP] = useState(false);
    const [isFullScreenImageVisible, setFullScreenImageVisible] = useState(false);
    const [fullScreenImageUri, setFullScreenImageUri] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const classDoc = await firestore().collection('Class').doc(classInfo.id).get();
                if (classDoc.exists) {
                    const classData = classDoc.data();
                    if (classData.syllabusUrl) {
                        setSyllabusImage(classData.syllabusUrl);
                    }
                    if (classData.timetableUrl) {
                        setTimetableImage(classData.timetableUrl);
                    }
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, [classInfo.id]);

    const showModal = () => setVisibleP(true);
    const hideModal = () => setVisibleP(false);

    const pickImage = (type) => {
        setVisible(true); // Show the image picker modal
        setImageType(type); // Set the type of image being picked
    };

    const deleteImage = (type) => {
        if (type === 'syllabus') {
            setSyllabusImage(null); // Clear the selected syllabus image
        } else if (type === 'timetable') {
            setTimetableImage(null); // Clear the selected timetable image
        }
    };

    const handleImageSelection = async (type) => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 600,
            maxWidth: 600,
        };

        launchImageLibrary(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('Image picker error: ', response.errorCode);
            } else {
                let imageUri = response.assets?.[0]?.uri;
                console.log(imageUri);

                if (type === 'syllabus') {
                    setSyllabusImage(imageUri);
                } else if (type === 'timetable') {
                    setTimetableImage(imageUri);
                }

                if (imageUri) {
                    await uploadImage(imageUri, type);
                }
            }
        });
    };

    const uploadImage = async (imageUri, type) => {
        if (!imageUri) {
            console.error('No image selected');
            return '';
        }

        const originalFilename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
        const filename = `${classInfo.id}_${type}_${originalFilename}`;
        console.log('Filename:', filename);
        const storageRef = storage().ref(`images/${filename}`);

        try {
            // Upload the file to Firebase Storage
            await storageRef.putFile(imageUri);

            // Retrieve the download URL for the uploaded file
            const url = await storageRef.getDownloadURL();
            console.log('Download URL:', url);

            // Update Firestore document with image URL
            if (type === 'syllabus') {
                await firestore().collection('Class').doc(classInfo.id).update({
                    syllabusUrl: url,
                });
                setSyllabusImage(url);
            } else if (type === 'timetable') {
                await firestore().collection('Class').doc(classInfo.id).update({
                    timetableUrl: url,
                });
                setTimetableImage(url);
            }

            return url;
        } catch (error) {
            console.error('Error uploading image:', error);
            return '';
        }
    };

    const handleImageClick = (uri) => {
        setFullScreenImageUri(uri);
        setFullScreenImageVisible(true);
    };

    const handleFullScreenImageClose = () => {
        setFullScreenImageVisible(false);
        setFullScreenImageUri(null);
    };

    return (
        <SafeAreaView style={tw`h-full bg-indigo-100 p-4`}>
            <ScrollView contentContainerStyle={tw`flex-grow`} showsVerticalScrollIndicator={false}>
                <PaperProvider>
                    {/* Class Name */}
                    <View style={tw`mb-4`}>
                        <Text style={tw`text-2xl font-bold text-center`}>Grade: {getClass(detail.id)}</Text>
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
                                <Text style={tw`text-lg font-bold`}>{teacherInfo?.name || "No assigned"}</Text>
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
                                    <Text style={tw`font-bold`}>
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
                                tableBody={students.map(({ name, regNo, DoB, gender }) => [name, regNo, new Date(DoB).toLocaleDateString(), gender])}
                                rowWidth={4.8}
                                borderColor={tw.color("indigo-400")}
                                borderWidth={0.2}
                                tableHeight={5}
                            />
                        </View>

                        <Portal>
                            <Modal visible={visibleP} onDismiss={hideModal} contentContainerStyle={tw`bg-white p-4 items-center justify-center max-h-230`}>
                                <Text style={tw`text-xl font-bold mb-2 items-center justify-center`}>All Students</Text>
                                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                    <FancyTable
                                        headerBGColor={tw.color("indigo-400")}
                                        headerFontColor="white"
                                        headerFontSize={15}
                                        bodyFontSize={13}
                                        bodyFontColor="black"
                                        header={header}
                                        tableBody={students.map(({ name, regNo, DoB, gender }) => [name, regNo, new Date(DoB).toLocaleDateString(), gender])}
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
                                <TouchableOpacity onPress={() => handleImageClick(syllabusImage)}>
                                    <Image
                                        source={{ uri: syllabusImage }}
                                        style={tw`w-80 h-50 rounded-lg`}
                                    />
                                </TouchableOpacity>
                                <IconButton
                                    icon="close-circle"
                                    iconColor='white'
                                    size={25}
                                    style={tw`absolute top--3 right--2 rounded-full`}
                                    onPress={() => deleteImage('syllabus')}
                                />
                            </View>
                        ) : (
                            <TouchableOpacity style={tw`bg-indigo-600 p-3 rounded-lg w-full`} onPress={() => handleImageSelection('syllabus')}>
                                <Text style={tw`text-white text-center`}>Upload Syllabus</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Timetable Upload Section */}
                    <View style={tw`bg-white p-4 rounded-lg shadow-lg mb-4`}>
                        <Text style={tw`text-xl font-bold mb-2`}>Timetable</Text>
                        {timetableImage ? (
                            <View style={tw`relative items-center justify-center`}>
                                <TouchableOpacity onPress={() => handleImageClick(timetableImage)}>
                                    <Image
                                        source={{ uri: timetableImage }}
                                        style={tw`w-80 h-50 rounded-lg`}
                                    />
                                </TouchableOpacity>
                                <IconButton
                                    icon="close-circle"
                                    iconColor='white'
                                    size={25}
                                    style={tw`absolute top--3 right--2 rounded-full`}
                                    onPress={() => deleteImage('timetable')}
                                />
                            </View>
                        ) : (
                            <TouchableOpacity style={tw`bg-indigo-600 p-3 rounded-lg w-full`} onPress={() => handleImageSelection('timetable')}>
                                <Text style={tw`text-white text-center`}>Upload Timetable</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Manage Class Button */}
                    <View style={tw`relative bottom-0 left-0 right-0 p-4`}>
                        <TouchableOpacity
                            style={tw`bg-indigo-600 p-3 rounded-lg w-full`}
                            onPress={() => navigation.navigate('RegisterScreen', { classInfo: detail, teacherInfo, students })}
                        >
                            <Text style={tw`text-white text-center`}>Update Classroom</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Full Screen Image Modal */}
                    <Modal visible={isFullScreenImageVisible} transparent={true} onRequestClose={handleFullScreenImageClose}>
                        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-75`}>
                            <Image
                                source={{ uri: fullScreenImageUri }}
                                style={tw`w-11/12 h-5/6 rounded-lg`}
                                resizeMode="contain"
                            />
                            <TouchableOpacity style={tw`absolute top-4 right-4`} onPress={handleFullScreenImageClose}>
                                <Text style={tw`text-white text-lg`}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
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
