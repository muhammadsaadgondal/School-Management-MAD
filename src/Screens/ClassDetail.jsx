import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Button } from 'react-native';
import { IconButton, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
// import * as ImagePicker from 'expo-image-picker';

const detail = {
    c_id: 1,
    grade: "10",
    subjects: ["Math", "Science", "English"],
    students: [
        { id: 1, name: "John" },
        { id: 2, name: "Alice" },
        { id: 3, name: "Bob" }
    ],
    teacher: { id: 101, name: "Mr. Smith" }
};

const ClassDetail = () => {
    const [syllabusImage, setSyllabusImage] = useState(null);

    const pickImage = async () => {
        console.log("Image Picker");
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setSyllabusImage(result.uri);
        }
    };

    const deleteImage = () => {
        setSyllabusImage(null);
    };

    return (
        <SafeAreaView style={tw` bg-red-100`}>

            <ScrollView contentContainerStyle={tw`p-4`}>
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

                {/* Students Section */}
                <View style={tw`bg-white p-4 rounded-lg shadow-lg mb-4`}>
                    <Text style={tw`text-xl font-bold mb-2`}>Students</Text>
                    {/* Add your students list here */}
                    <Text>Student 1</Text>
                    <Text>Student 2</Text>
                    <Text>Student 3</Text>
                </View>

                {/* Syllabus Upload Section */}
                <View style={tw`bg-white p-4 rounded-lg shadow-lg mb-4`}>
                    <Text style={tw`text-xl font-bold mb-2`}>Syllabus</Text>
                    {syllabusImage ? (
                        <View>
                            <Image source={{ uri: syllabusImage }} style={tw`w-full h-40 rounded-lg mb-4`} />
                            <View style={tw`flex-row justify-between`}>
                                <Button title="Replace Image" onPress={() => { }} />
                                <Button title="Delete Image" onPress={deleteImage} color="red" />
                            </View>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={tw`bg-blue-500 p-2 rounded-lg`}
                            onPressIn={() => { 
                                console.log("gchgvh");
                                pickImage();
                            }}

                        >
                            <Text style={tw`text-white`}>Upload Image</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ClassDetail;
