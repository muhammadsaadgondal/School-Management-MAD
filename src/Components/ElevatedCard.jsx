import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import { IconButton } from 'react-native-paper';
import { deleteNotification, getClassesNotifications } from '../firebase/handlers/Notification';

const ElevatedCards = ({ navigation }) => {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const noti = await getClassesNotifications();
                setAnnouncements(noti);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchNotifications();
    }, []);

    const handleDelNotification = async (notification) => {
        try {

            await deleteNotification(notification);
            const updatedNotifications = announcements.filter(announcement => announcement.id !== notificationId);
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
            <ScrollView horizontal={true} style={tw`p-4 mb-15`}>
                {announcements.map((announcement, index) => (
                    <View key={index} style={tw`relative flex-1 items-center justify-center w-40 h-60 bg-indigo-500 rounded-lg m-2 shadow-lg`}>
                        <IconButton
                            icon="progress-pencil"
                            size={20}
                            iconColor='white'
                            style={tw`absolute top--2 left--2`}
                            onPress={() => navigation.navigate('AnnouncementScreen', { announcement })}
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
