import { Dimensions, View, Text, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import InfoCard from '../Components/InfoCard'
import { Button, Icon, MD3Colors, Searchbar } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc';
import AnnouncementCard from '../Components/AnnouncementCard'
import ElevatedCards from '../Components/ElevatedCard'



const listedClasses = [
    {
        c_id: 1,
        grade: "10",
        subjects: ["Math", "Science", "English"],
        students: [
            { id: 1, name: "John" },
            { id: 2, name: "Alice" },
            { id: 3, name: "Bob" }
        ],
        teacher: { id: 101, name: "Mr. Smith" }
    }, {
        c_id: 3,
        grade: "4",
        subjects: ["Math", "Science", "English"],
        students: [
            { id: 1, name: "John" },
            { id: 2, name: "Alice" },
            { id: 2, name: "Alice" },
            { id: 3, name: "Bob" },
            { id: 3, name: "Bob" }
        ],
        teacher: { id: 101, name: "Mr. Smith" }
    },
    {
        c_id: 2,
        grade: "11",
        subjects: ["Physics", "Chemistry", "Biology"],
        students: [
            { id: 4, name: "Emily" },
            { id: 5, name: "David" },
            { id: 6, name: "Sophia" }
        ],
        teacher: { id: 102, name: "Ms. Johnson" }
    }, {
        c_id: 1,
        grade: "10",
        subjects: ["Math", "Science", "English"],
        students: [
            { id: 1, name: "John" },
            { id: 2, name: "Alice" },
            { id: 3, name: "Bob" }
        ],
        teacher: { id: 101, name: "Mr. Smith" }
    }, {
        c_id: 3,
        grade: "4",
        subjects: ["Math", "Science", "English"],
        students: [
            { id: 1, name: "John" },
            { id: 2, name: "Alice" },
            { id: 2, name: "Alice" },
            { id: 3, name: "Bob" },
            { id: 3, name: "Bob" }
        ],
        teacher: { id: 101, name: "Mr. Smith" }
    },
    {
        c_id: 2,
        grade: "11",
        subjects: ["Physics", "Chemistry", "Biology"],
        students: [
            { id: 4, name: "Emily" },
            { id: 5, name: "David" },
            { id: 6, name: "Sophia" }
        ],
        teacher: { id: 102, name: "Ms. Johnson" }
    }
];


const ManageClasses = () => {
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
        <ScrollView style={tw`bg-indigo-100 h-full`}>
            <View style={tw`p-4 mt-4 ml-4 mr-4 flex-row justify-between items-center `}>
                <Text style={tw`text-xl font-bold text-indigo-700`}>SMS</Text>
                <Icon
                    source="eye-settings"
                    color={tw.color('indigo-700')}
                    size={25}
                />
            </View>
            <Searchbar
                style={tw`mt-2 mb-2 ml-4 mr-4 bg-white rounded-lg border border-gray-400 `}
                placeholder="Search Grade"
                onChangeText={handleSearch}
                value={searchQuery}
            />
            <View style={tw`flex-row justify-between p-4  ml-4 mr-4`}>
                <Text style={tw`text-xl font-bold`}>Listed Classes</Text>
                <Icon source='plus-box' size={25} color={tw.color('indigo-700')} />
            </View>
            <InfoCard data={filteredClasses} />

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
