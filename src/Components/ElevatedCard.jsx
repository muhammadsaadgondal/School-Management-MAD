// ElevatedCards.js
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import tw from 'twrnc';
import { IconButton } from 'react-native-paper';
import { deleteNotification, getClassesNotifications } from '../firebase/handlers/Notification';

const ElevatedCards = ({ navigation }) => {
    const [announcements, setAnnouncements] = useState([]);
    const fetchNotificationsRef = useRef(null);

    const fetchNotifications = async () => {
        try {
            console.log('Fetching notifications');
            const noti = await getClassesNotifications();
            setAnnouncements(noti);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        fetchNotificationsRef.current = fetchNotifications; // Store the function reference
    }, []);

    const updateNotifications = () => {
        fetchNotificationsRef.current();
    }

    const reloadNotifications = async () => {
        const noti = await getClassesNotifications();
        setAnnouncements(noti);
    }

    const handleDelNotification = async (notification) => {
        try {
            await deleteNotification(notification);
            const updatedNotifications = announcements.filter(announcement =>
                announcement.classId !== notification.classId ||
                announcement.datePosted !== notification.datePosted ||
                announcement.message !== notification.message ||
                announcement.title !== notification.title ||
                announcement.visibleTill !== notification.visibleTill
            );
            setAnnouncements(updatedNotifications);
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
    };

    if (announcements.length === 0) {
        return <Text style={tw`text-center text-lg text-gray-500`}>No announcements available</Text>;
    }

    return (
        <View>
            <View style={tw`p-4 mt-2 ml-4 mr-4 flex-row justify-between items-center `}>
                <Text style={tw`text-xl font-bold`}>Announcements</Text>
                <IconButton
                    icon="plus-box"
                    iconColor={tw.color('indigo-700')}
                    size={25}
                    onPress={() => navigation.navigate('AnnouncementScreen', { reloadNotifications })}
                />
            </View>
            <ScrollView horizontal={true} style={tw`p-4 mb-15`}>
                {announcements.map((announcement, index) => (
                    <View key={index} style={tw`relative flex-1 items-center justify-center w-40 h-60 bg-indigo-500 rounded-lg m-2 shadow-lg`}>
                        <IconButton
                            icon="progress-pencil"
                            size={20}
                            iconColor='white'
                            style={tw`absolute top--2 left--2`}
                            onPress={() => navigation.navigate('AnnouncementScreen', { announcement, reloadNotifications })}
                        />
                        <IconButton
                            icon="close-circle"
                            size={20}
                            iconColor='white'
                            style={tw`absolute top--2 right--2`}
                            onPress={() => handleDelNotification(announcement)}
                        />

                        <Text style={tw`text-white`}>{announcement.datePosted}</Text>
                        <Text style={tw`text-white text-lg font-bold p-1`}>{announcement.title}</Text>
                        <Text style={tw`text-white text-center`}>{announcement.message}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 8
    }
});

export default ElevatedCards;
