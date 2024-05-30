import { Dimensions, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import InfoCard from '../../Components/InfoCard'
import { IconButton } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc';
import ElevatedCards from '../../Components/ElevatedCard'
import { getAllClasses } from '../../firebase/handlers/Class'

const getClass = (id) => {
    switch (id) {
        case '0':
            return 'Nursery';
        case '1':
            return 'Prep';
        case '2':
            return '1';
        case '3':
            return '2';
        case '4':
            return '3';
        case '5':
            return '4';
        case '6':
            return '5';
        case '7':
            return '6';
        case '8':
            return '7';
        case '9':
            return '8';
        default:
            return '';
    }
};

const ManageClasses = ({ navigation }) => {
    const [classData, setClassData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('====================================');
                console.log('Fetching classes data');
                console.log('====================================');
                const classes = await getAllClasses();
                setClassData(classes);
                console.log("Classes data fetched");
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData(classData);
    }, []);



    

    return (
        <ScrollView style={tw`bg-white h-full`}>
            <View style={tw`p-4 mt-4 ml-4 mr-4 flex-row justify-between items-center `}>
                <Text style={tw`text-xl font-bold text-indigo-700`}>G's School Syetm</Text>
                <IconButton
                    icon="eye-settings"
                    color={tw.color('indigo-700')}
                    size={25}
                />
            </View>

            <View style={tw`flex-row justify-between p-4  ml-4 mr-4`}>
                <Text style={tw`text-xl font-bold`}>Listed Classes</Text>
                <IconButton
                    icon='card-account-details-outline'
                    size={35}
                    style={tw`mt--3`}
                    iconColor={tw.color('indigo-700')}
                    // onPress={() => reloadData()}
                />
            </View>

            {classData.map((classItem) => (
                <InfoCard key={classItem.id} data={classItem}  navigation={navigation} />
            ))}

            
            <ElevatedCards navigation={navigation} />
        </ScrollView>
    )
}

export default ManageClasses
