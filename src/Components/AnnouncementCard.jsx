
import { View, Text, LogBox } from 'react-native'
import React from 'react'
import { Avatar, Card, IconButton } from 'react-native-paper'


export default function AnnouncementCard() {

    return (
        announcements.map((announcement, index) => (
            <Card.Title
                title={announcement.title}
                subtitle={announcement.content}
                left={(props) => <Avatar.Icon {...props} icon="folder" />}
                right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => { }} />}
            />
        )))
}

