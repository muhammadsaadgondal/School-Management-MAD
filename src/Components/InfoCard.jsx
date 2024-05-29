import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Icon, IconButton, Text } from "react-native-paper";
import tw from 'twrnc';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";
import { fetchTeachers } from "../firebase/handlers/Teachers";
import { getClassStudents } from "../firebase/handlers/getAllStudents";


const InfoCard = ({ data, navigation }) => {

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (!data || data.length === 0) {
        return <Text>No data found</Text>;
    }

    const classInfo = data.data;
    const [teacherInfo, setTeacherInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    console.log(classInfo.tid);
    useEffect(() => {
        const fetchTeacherInfo = async () => {
            if (classInfo.tid) {
                const info = await fetchTeachers(classInfo.tid);
                const students = await getClassStudents(classInfo.id);
                setTeacherInfo(info);
                setLoading(false);
                setStudents(students);
            }
        };

        fetchTeacherInfo();
    }, [classInfo.tid]);


    return (



        <TouchableOpacity
            style={tw`mt-2 mb-2 ml-4 mr-4 pt-2 pb-2  bg-indigo-700 rounded-lg `}
            // Adding delayPressIn
            onPress={() => navigation.navigate('ClassDetail', { classInfo,students,teacherInfo, navigation })}
        >
            <IconButton
                icon="progress-pencil"
                size={20}
                iconColor='white'
                style={tw`absolute top--2 right-6  `}
                onPress={() => navigation.navigate('RegisterScreen', { classInfo, navigation })}
            />
            <IconButton
                icon="close-circle"
                size={20}
                iconColor='white'
                style={tw`absolute top--2 right--2  `}
                onPress={() => console.log('Icon pressed')}
            />
            <View style={tw`flex-row justify-start items-center  `}>
                <Icon source="account-box" size={40} color='white' />
                <View style={tw`ml-3 flex-shrink`}>
                    <Text style={tw`text-lg text-white`}>Grade: {classInfo.id}</Text>
                    <View style={tw`flex-row justify-start items-center `}>
                        <Text style={tw`text-sm text-gray-300`}>
                            Class Teacher: {teacherInfo ? teacherInfo.name : 'Loading...'}
                        </Text>
                    </View>
                </View>
                <View style={tw`flex-shrink-0 ml-auto pr-3 pt-8`}>
                    <Text style={tw`text-sm text-gray-300`}> Students: {students.length}</Text>
                </View>
            </View>
        </TouchableOpacity>


    );
}


const styles = StyleSheet.create({
    classContainer: {
        borderRadius: '1px solid black'
    }
})

export default InfoCard;