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


export default function ElevatedCards() {
    return (
        <View>
            <ScrollView horizontal={true} style={tw`p-4 `}>{
                announcements.map((announcement, index) => (
                    <View key={index} style={[styles.card, styles.cardElevated,tw`text-center`] }>
                         <IconButton
                            icon="progress-pencil"
                            size={20}
                            iconColor='gray'
                            style={tw`absolute top--2 left--2  `} // Apply Tailwind positioning
                            onPress={() => console.log('Icon pressed')}
                        />
                       <IconButton
                            icon="close-circle"
                            size={20}
                            iconColor='gray'
                            style={tw`absolute top--2 right--2  `} // Apply Tailwind positioning
                            onPress={() => console.log('Icon pressed')}
                        />
                        <Text style={tw`text-center`}> {announcement.date} </Text>
                        <Text style={tw`text-lg font-bold p-1 text-center`}>{announcement.title}</Text>
                        <Text style={tw`text-center`}>{announcement.content}</Text>
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
    },

    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        minHeight: 250,
        borderRadius: 4,
        margin: 8,

    },
    cardElevated: {
        backgroundColor: '#CAD5E2',
        elevation: 4,
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowColor: '#333',
        shadowOpacity: 0.4,
        shadowRadius: 2

    }
})