import { Dimensions, View, Text, ScrollView } from 'react-native'
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
        <ScrollView style={tw`bg-gray-100 h-full`}>
            <View style={tw`p-4 mt-4 ml-4 mr-4 flex-row justify-between items-center `}>
                <Text style={tw`text-xl font-bold`}>Manage Classes</Text>
                <Icon
                    source="eye-settings"
                    color={MD3Colors.error50}
                    size={25}
                />
            </View>
            <Searchbar
                style={tw`mt-2 mb-2 ml-4 mr-4   bg-indigo-50 rounded-lg `}
                placeholder="Search Grade"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            <InfoCard />
            <View style={tw`p-4 mt-2 ml-4 mr-4 flex-row justify-between items-center `}>
                <Text style={tw`text-xl font-bold`}>Announcements</Text>
                <Icon
                    source="view-dashboard"
                    color={MD3Colors.error50}
                    size={25}
                />
            </View>
            <ElevatedCards />


        </ScrollView>
    )
}

export default ManageClasses