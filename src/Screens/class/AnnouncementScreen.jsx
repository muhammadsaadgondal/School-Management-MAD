import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput as PaperTextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'twrnc';
import DropDownPicker from 'react-native-dropdown-picker';
import { getClass } from './ProfileScreen';
import { updateNotification, writeNotification } from '../../firebase/handlers/Notification';

import { fetchNotificationsRef } from '../../Components/ElevatedCard';


const classes = [
    { label: 'All', value: '0' },
    { label: 'Nursery', value: '1' },
    { label: 'Prep', value: '2' },
    { label: 'Grade 1', value: '3' },
    { label: 'Grade 2', value: '4' },
    { label: 'Grade 3', value: '5' },
    { label: 'Grade 4', value: '6' },
    { label: 'Grade 5', value: '7' },
    { label: 'Grade 6', value: '8' },
    { label: 'Grade 7', value: '9' },
    { label: 'Grade 8', value: '10' },
];
const AnnouncementScreen = ({ route, navigation }) => {
    const { announcement, reloadNotifications } = route.params;
    // console.log(announcement);
    const [date, setDate] = useState(announcement === undefined ? new Date().toLocaleDateString() : new Date(announcement.datePosted).toLocaleDateString());

    const [title, setTitle] = useState(announcement === undefined ? '' : announcement.title);
    const [description, setDescription] = useState(announcement === undefined ? '' : announcement.message);
    const [showDatePicker, setShowDatePicker] = useState(false);

    /* DropDown */
    const [classOpen, setClassOpen] = useState(false);
    const [className, setClassname] = useState(announcement?.classId || '0');

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const handleUpdate = async () => {
        // Handle the submit action (e.g., save the announcement)
        await updateNotification(title, description, announcement.datePosted, className);
        reloadNotifications();
        navigation.goBack();
    };
    const handleSubmit = async () => {
        console.log("Adding notification");
        await writeNotification(title, description, className, date);
        reloadNotifications();
        navigation.goBack();
    };


    return (
        <View style={tw`flex-1 bg-indigo-700 justify-center `}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={tw`flex-grow justify-center items-center px-4`}>

                <Text style={tw`text-2xl text-white font-bold p-8 `}>{announcement === undefined ? 'Make an Announcement' : 'Update announcement'}</Text>

                <DropDownPicker
                    open={classOpen}
                    value={className}
                    items={classes}
                    setOpen={setClassOpen}
                    setValue={setClassname}
                    containerStyle={tw`h-10 mb-5 w-full`}
                    style={tw`bg-white`}
                    dropDownContainerStyle={tw`bg-white`}
                    placeholder="Select Class"
                    zIndex={2000}
                    zIndexInverse={2000}
                />

                {announcement === undefined ?
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={tw`w-full mb-5`}>
                        <PaperTextInput
                            label="Valid till"
                            value={date}
                            editable={false}
                            style={tw`bg-white w-full rounded-lg`}
                        />
                    </TouchableOpacity>
                    :
                    <View  >
                        <Text style={tw`text-indigo-700 `}>

                        </Text>
                    </View>
                }
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
                {announcement === undefined ?
                    <Button
                        mode="contained"
                        onPress={handleSubmit}
                        style={tw`bg-green-500 w-full p-3 rounded-lg`}>
                        <Text style={tw`text-white`}>Announce</Text>
                    </Button>
                    :
                    <Button
                        mode="contained"
                        onPress={handleUpdate}
                        style={tw`bg-green-500 w-full p-3 rounded-lg`}>
                        <Text style={tw`text-white`}>Update</Text>
                    </Button>
                }
            </ScrollView>
        </View>
    );
};

export default AnnouncementScreen;
