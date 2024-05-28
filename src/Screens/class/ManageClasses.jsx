import { Dimensions, View, Text, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import InfoCard from '../../Components/InfoCard'
import { ActivityIndicator, Button, Icon, IconButton, MD3Colors, Searchbar } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc';
import AnnouncementCard from '../../Components/AnnouncementCard'
import ElevatedCards from '../../Components/ElevatedCard'


import firestore from '@react-native-firebase/firestore';



const listedClasses = [
    {
        c_id: 1,
        grade: "10",
        subjects: ["Math", "Science", "English"],
        students: [
            { id: 1, name: "John Cena", age: 15, reg_no: "101", attendance: "85%", gender: "male" },
            { id: 2, name: "Muhammad Saad Gondal", age: 16, reg_no: "102", attendance: "90%", gender: "male" },
            { id: 3, name: "Bob", age: 15, reg_no: "103", attendance: "88%", gender: "male" },
            { id: 4, name: "Charlie", age: 16, reg_no: "104", attendance: "92%", gender: "female" },
            { id: 5, name: "David", age: 15, reg_no: "105", attendance: "80%", gender: "female" }
        ],
        teacher: { id: 101, name: "Mr. Smith", email: "temp@gmail.com", experience: 5 }
    },
    {
        c_id: 3,
        grade: "4",
        subjects: ["Math", "Science", "English"],
        students: [
            { id: 1, name: "John Cena", age: 15, reg_no: "101", attendance: "85%", gender: "male" },
            { id: 2, name: "Muhammad Saad Gondal", age: 16, reg_no: "102", attendance: "90%", gender: "male" },
            { id: 3, name: "Bob", age: 15, reg_no: "103", attendance: "88%", gender: "male" },
            { id: 4, name: "Charlie", age: 16, reg_no: "104", attendance: "92%", gender: "female" },
            { id: 5, name: "David", age: 15, reg_no: "105", attendance: "80%", gender: "female" }
        ],
        teacher: { id: 101, name: "Mr. Smith", email: "temp@gmail.com", experience: 5 }
    },
    {
        c_id: 2,
        grade: "11",
        subjects: ["Physics", "Chemistry", "Biology"],
        students: [
            { id: 1, name: "John Cena", age: 15, reg_no: "101", attendance: "85%", gender: "male" },
            { id: 2, name: "Muhammad Saad Gondal", age: 16, reg_no: "102", attendance: "90%", gender: "male" },
            { id: 3, name: "Bob", age: 15, reg_no: "103", attendance: "88%", gender: "male" },
            { id: 4, name: "Charlie", age: 16, reg_no: "104", attendance: "92%", gender: "female" },
            { id: 5, name: "David", age: 15, reg_no: "105", attendance: "80%", gender: "female" }
        ],
        teacher: { id: 102, name: "Ms. Johnson", email: "temp@gmail.com", experience: 5 }
    },
    {
        c_id: 1,
        grade: "10",
        subjects: ["Math", "Science", "English"],
        students: [
            { id: 1, name: "John Cena", age: 15, reg_no: "101", attendance: "85%", gender: "male" },
            { id: 2, name: "Muhammad Saad Gondal", age: 16, reg_no: "102", attendance: "90%", gender: "male" },
            { id: 3, name: "Bob", age: 15, reg_no: "103", attendance: "88%", gender: "male" },
            { id: 4, name: "Charlie", age: 16, reg_no: "104", attendance: "92%", gender: "female" },
            { id: 5, name: "David", age: 15, reg_no: "105", attendance: "80%", gender: "female" }
        ],
        teacher: { id: 101, name: "Mr. Smith", email: "temp@gmail.com", experience: 5 }
    },
    {
        c_id: 3,
        grade: "4",
        subjects: ["Math", "Science", "English"],
        students: [
            { id: 1, name: "John Cena", age: 15, reg_no: "101", attendance: "85%", gender: "male" },
            { id: 2, name: "Muhammad Saad Gondal", age: 16, reg_no: "102", attendance: "90%", gender: "male" },
            { id: 3, name: "Bob", age: 15, reg_no: "103", attendance: "88%", gender: "male" },
            { id: 4, name: "Charlie", age: 16, reg_no: "104", attendance: "92%", gender: "female" },
            { id: 5, name: "David", age: 15, reg_no: "105", attendance: "80%", gender: "female" }
        ],
        teacher: { id: 101, name: "Mr. Smith", email: "temp@gmail.com", experience: 5 }
    },
    {
        c_id: 2,
        grade: "11",
        subjects: ["Physics", "Chemistry", "Biology"],
        students: [
            { id: 1, name: "John Cena", age: 15, reg_no: "101", attendance: "85%", gender: "male" },
            { id: 2, name: "Muhammad Saad Gondal", age: 16, reg_no: "102", attendance: "90%", gender: "male" },
            { id: 3, name: "Bob", age: 15, reg_no: "103", attendance: "88%", gender: "male" },
            { id: 4, name: "Charlie", age: 16, reg_no: "104", attendance: "92%", gender: "female" },
            { id: 5, name: "David", age: 15, reg_no: "105", attendance: "80%", gender: "female" }
        ],
        teacher: { id: 102, name: "Ms. Johnson", email: "temp@gmail.com", experience: 5 }
    }
];



const ManageClasses = ({ navigation }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersCollection = firestore().collection('Admin').doc('ID').get();
                
                console.log('====================================');
                console.log(usersCollection);
                console.log("Here");
                console.log('====================================');
            } catch (error) {
                console.error("Error fetching data: ", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);





    const [searchQuery, setSearchQuery] = useState('');
    const [filteredClasses, setFilteredClasses] = useState(listedClasses);

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
                    onPress={() => navigation.navigate("RegisterScreen", { navigation })} />
            </View>
            <InfoCard data={filteredClasses} navigation={navigation} />

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
