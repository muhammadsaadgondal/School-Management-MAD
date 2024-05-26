import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { Icon, IconButton } from 'react-native-paper';

const announcements = [
    {
        id: 1,
        date: '2021-09-01',
        title: "Holiday for 2 days",
        content: "Because of uncertain political conditions 10th and 11th may are declared as holidays."
    },
    {
        id: 2,
        title: "Announcement 2",
        date: '2021-09-01',
        content: "This is the second announcement."
    },
    {
        id: 3,
        title: "Announcement 3",
        date: '2021-09-01',
        content: "This is the third announcement."
    }
    // Add more announcements as needed
];


const ElevatedCards=({navigation})=> {


    return (
        <View >
            <ScrollView horizontal={true} style={tw`p-4 mb-15`}>
                {announcements.map((announcement, index) => (
                    <View key={index} style={tw`relative flex-1 items-center justify-center w-40 h-60 bg-indigo-500 rounded-lg m-2 shadow-lg`}>
                        <IconButton
                            icon="progress-pencil"
                            size={20}
                            iconColor='white'
                            style={tw`absolute top--2 left--2  `} // Apply Tailwind positioning
                            onPress={() => navigation.navigate('AnnouncementScreen', { announcement,navigation })}
                            
                        />
                        <IconButton
                            icon="close-circle"
                            size={20}
                            iconColor='white'
                            style={tw`absolute top--2 right--2  `} // Apply Tailwind positioning
                            onPress={() => console.log('Icon pressed')}
                        />
                        <Text style={tw`text-white `}>{announcement.date}</Text>
                        <Text style={tw`text-white text-lg font-bold p-1`}>{announcement.title}</Text>
                        <Text style={tw`text-white  text-center`}>{announcement.content}</Text>
                    </View>
                )

                )
                }

            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 8
    }
});

export default ElevatedCards;