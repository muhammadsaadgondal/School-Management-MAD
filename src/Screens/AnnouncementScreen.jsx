import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput as PaperTextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'twrnc';

const AnnouncementScreen = ({ route }) => {
    const { announcement, navigation } = route.params;
    console.log(announcement);
    const [date, setDate] = useState(announcement === undefined ? new Date() : new Date(announcement.date));

    const [title, setTitle] = useState(announcement === undefined ? '' : announcement.title);
    const [description, setDescription] =  useState(announcement === undefined ? '' : announcement.content);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const handleSubmit = () => {
        // Handle the submit action (e.g., save the announcement)
        console.log('Announcement submitted:', { date, title, description });
    };

    return (
        <View style={tw`flex-1 bg-blue-800 justify-center `}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={tw`flex-grow justify-center items-center px-4`}>

                <Text style={tw`text-2xl text-white font-bold p-8 `}>{announcement===undefined ?'Make an Announcement':'Update announcement'}</Text>

                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={tw`w-full mb-5`}>
                    <PaperTextInput
                        label="Date"
                        value={date.toDateString()}
                        editable={false}
                        style={tw`bg-white w-full rounded-lg`}
                    />
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                    />
                )}

                <PaperTextInput
                    label="Title"
                    value={title}
                    onChangeText={setTitle}
                    style={tw`bg-white w-full mb-5 rounded-lg`}
                />

                <PaperTextInput
                    label="Description"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                    style={tw`bg-white w-full mb-5 rounded-lg`}
                />

                <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={tw`bg-green-500 w-full p-3 rounded-lg`}>
                    <Text style={tw`text-white`}>{announcement===undefined ?'Announce':'Update'}</Text>
                </Button>
            </ScrollView>
        </View>
    );
};

export default AnnouncementScreen;
