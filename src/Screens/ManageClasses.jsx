import { Dimensions, View, Text, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import InfoCard from '../Components/InfoCard'
import { Button, Icon, MD3Colors, Searchbar } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc';
import AnnouncementCard from '../Components/AnnouncementCard'
import ElevatedCards from '../Components/ElevatedCard'

const ManageClasses = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
        <ScrollView style={tw`bg-indigo-100 h-full`}>
            <View style={tw`p-4 mt-4 ml-4 mr-4 flex-row justify-between items-center `}>
                <Text style={tw`text-xl font-bold text-indigo-700`}>SMA</Text>
                <Icon
                    source="eye-settings"
                    color={tw.color('indigo-700')}
                    size={25}
                />
            </View>
            <Searchbar
                style={tw`mt-2 mb-2 ml-4 mr-4 bg-white rounded-lg border border-gray-400 `}
                placeholder="Search Grade"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            <View style={tw`flex-row justify-between p-4  ml-4 mr-4`}>
                <Text style={tw`text-xl font-bold`}>Listed Classes</Text>
                <Icon source='plus-box' size={25} color={tw.color('indigo-700')} />
            </View>
            <InfoCard />
            
            <View style={tw`p-4 mt-2 ml-4 mr-4 flex-row justify-between items-center `}>
                <Text style={tw`text-xl font-bold`}>Announcements</Text>
                <Icon
                    source="plus-box"
                    color={tw.color('indigo-700')}
                    size={25}
                />
            </View>
            <ElevatedCards />
            {/* <View style={tw`flex-row justify-center p-4 mt--2 ml-4 mr-4`}>
                <TouchableOpacity style={tw`bg-blue-500 p-4 rounded-lg`}>
                    <Text style={tw`text-white text-center`}>Make an Announcement</Text>
                </TouchableOpacity>
            </View> */}
        </ScrollView>
    )
}

export default ManageClasses
