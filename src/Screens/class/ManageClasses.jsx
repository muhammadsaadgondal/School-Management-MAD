import { Dimensions, View, Text, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import InfoCard from '../../Components/InfoCard'
import { ActivityIndicator, Button, Icon, IconButton, MD3Colors, Searchbar } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc';
import AnnouncementCard from '../../Components/AnnouncementCard'
import ElevatedCards from '../../Components/ElevatedCard'
import { getAllClasses } from '../../firebase/handlers/getAllClasses'






const ManageClasses = ({ navigation }) => {
    const [classData, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('====================================');
                console.log('Fetching classes data');
                console.log('====================================');
                const classes = await getAllClasses(); // Wait for the result
                setData(classes);
                console.log("Classes data fetched");
                console.log(classes); // Log the fetched classes
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData(); // Call the fetchData function
    }, []);





    const [searchQuery, setSearchQuery] = useState('');
    const [filteredClasses, setFilteredClasses] = useState(classData);

    // Function to handle search query change
    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = listedClasses.filter(item =>
            item.grade.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredClasses(filtered);
    };

    return (
        <ScrollView style={tw`bg-white h-full`}>
            <View style={tw`p-4 mt-4 ml-4 mr-4 flex-row justify-between items-center `}>
                <Text style={tw`text-xl font-bold text-indigo-700`}>SMS</Text>
                <Icon
                    source="eye-settings"
                    color={tw.color('indigo-700')}
                    size={25}
                />
            </View>
            <Searchbar
                style={tw`mt-2 mb-2 ml-4 mr-4 bg-indigo-100 rounded-lg border border-gray-400 `}
                placeholder="Search Grade"
                onChangeText={handleSearch}
                value={searchQuery}
            />
            <View style={tw`flex-row justify-between p-4  ml-4 mr-4`}>
                <Text style={tw`text-xl font-bold`}>Listed Classes</Text>
                <IconButton
                    icon='plus-box'
                    size={25}
                    iconColor={tw.color('indigo-700')}
                    onPress={() => {}}/* navigation.navigate("RegisterScreen", { navigation })} */ />
            </View>


            {classData.map((classItem) => (
                <InfoCard key={classItem.id} data={classItem} navigation={navigation} />
            ))}

            <View style={tw`p-4 mt-2 ml-4 mr-4 flex-row justify-between items-center `}>
                <Text style={tw`text-xl font-bold`}>Announcements</Text>
                <IconButton
                    icon="plus-box"
                    iconColor={tw.color('indigo-700')}
                    size={25}
                    onPress={() => navigation.navigate('AnnouncementScreen', { navigation })}
                />

            </View>
            <ElevatedCards navigation={navigation} />

        </ScrollView>
    )
}

export default ManageClasses
