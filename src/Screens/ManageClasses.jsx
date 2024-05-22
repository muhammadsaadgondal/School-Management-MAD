import { View, Text } from 'react-native'
import React from 'react'
import InfoCard from '../Components/InfoCard'
import { Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc';

const ManageClasses = () => {
    return (
        <SafeAreaView>
            <View style={tw`p-2 ml-4 mr-4 flex-row justify-between items-center `}>
                <Text style={tw`text-xl font-bold`}>Manage Classes</Text>
                <Button icon={{ uri: 'https://avatars0.githubusercontent.com/u/17571969?v=3&s=400' }} />
            </View>
            <InfoCard />
            <View style={tw`p-2 ml-4 mr-4 flex-row justify-between items-center `}>
                <Text style={tw`text-xl font-bold`}>Performance</Text>
                <Button icon={{ uri: 'https://avatars0.githubusercontent.com/u/17571969?v=3&s=400' }} />
            </View>
        </SafeAreaView>
    )
}

export default ManageClasses