import { TouchableOpacity, View } from "react-native";
import { Icon, IconButton, Text } from "react-native-paper";
import tw from 'twrnc';
import React, { useEffect, useState, useCallback } from "react";
import { fetchTeacher } from "../firebase/handlers/Teachers";
import { getClassStudents } from "../firebase/handlers/Student";

const getClass = (id) => {
    switch (id) {
        case '0': return 'Nursery';
        case '1': return 'Prep';
        case '2': return '1';
        case '3': return '2';
        case '4': return '3';
        case '5': return '4';
        case '6': return '5';
        case '7': return '6';
        case '8': return '7';
        case '9': return '8';
        default: return '';
    }
};

const InfoCard = ({ data, navigation }) => {
    const classInfo = data.data;
    const [teacherInfo, setTeacherInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [trigger, setTrigger] = useState(false);

    const fetchInfo = useCallback(async () => {
        if (!classInfo) return;
        setLoading(true);
        try {
            const teacherInfo = await fetchTeacher(classInfo.tid);
            console.log("Fetching latest data for class: ", getClass(classInfo.id));
            const students = await getClassStudents(classInfo.id);
            setTeacherInfo(teacherInfo);
            setStudents(students);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
            setTrigger(false);
        }
    }, [classInfo, trigger]);

    useEffect(() => {
        fetchInfo();
    }, []);

    const reload = () => {
        console.log("Reloading data...");
        setTrigger(true);
        fetchInfo();
    }

    if (loading) {
        return (
            <View style={tw`mt-2 mb-2 ml-4 mr-4 pt-2 pb-2 bg-indigo-700 rounded-lg`}>
                <Text style={tw`text-white p-4`}>
                    Loading...
                </Text>
            </View>
        );
    }

    if (!data || data.length === 0) {
        return <Text>No data found</Text>;
    }

    return (
        <TouchableOpacity
            style={tw`mt-2 mb-2 ml-4 mr-4 pt-2 pb-2 bg-indigo-700 rounded-lg`}
            onPress={() => navigation.navigate('ClassDetail', { classInfo, students, teacherInfo, reload })}
        >
            <IconButton
                icon="progress-pencil"
                size={20}
                iconColor='white'
                style={tw`absolute top--2 right-0`}
                onPress={() => navigation.navigate('RegisterScreen', { classInfo, students, teacherInfo, reload })}
            />
            <View style={tw`flex-row justify-start items-center`}>
                <Icon source="account-box" size={40} color='white' />
                <View style={tw`ml-3 flex-shrink`}>
                    <Text style={tw`text-lg text-white ml-0`}>Grade: {getClass(classInfo.id)}</Text>
                    <View style={tw`flex-row justify-start items-center`}>
                        <Text style={tw`text-sm text-gray-300`}>
                            Class Teacher: {teacherInfo ? teacherInfo.name : 'No Teacher'}
                        </Text>
                    </View>
                </View>
                <View style={tw`flex-shrink-0 ml-auto pr-3 pt-8`}>
                    <Text style={tw`text-sm text-gray-300`}>Students: {students.length}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default React.memo(InfoCard);
