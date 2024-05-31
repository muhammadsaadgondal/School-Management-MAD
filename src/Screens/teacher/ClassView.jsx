import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { getTeacherStudents } from '../../handlers-Ali/teacherClassHandler';

const StudentList = ({ teacherId }) => {
    const [students, setStudents] = useState([]);
    const [className, setClassName] = useState('N/A');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const studentsData = await getTeacherStudents(teacherId);
                console.log('Fetched students data:', studentsData); // Debug log
                setStudents(studentsData);
                
                // Set class name from the first student if available
                if (studentsData.length > 0 && studentsData[0].session && studentsData[0].session.class) {
                    setClassName(studentsData[0].session.class);
                }
            } catch (error) {
                console.error('Error fetching students:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [teacherId]);

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    // Log the students array to ensure it's being set correctly
    console.log('Students state:', students);

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={{
                    uri: 'https://img.freepik.com/free-vector/gradient-dynamic-blue-lines-background_23-2148995756.jpg',
                }}
                style={styles.imageBackground}
            >
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        Class: {className}
                    </Text>
                </View>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    {students.map((student, index) => (
                        <Card key={index} style={styles.card}>
                            <Card.Content style={styles.cardContent}>
                                <Title style={styles.text}>{student.name}</Title>
                                <Paragraph style={styles.text}>
                                    Reg. #: {student.regNo}
                                </Paragraph>
                                <Paragraph>
                                    Gender: {student.gender}
                                </Paragraph>
                            </Card.Content>
                        </Card>
                    ))}
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 10,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 30,
        color: 'white',
    },
    scrollViewContent: {
        paddingVertical: 10,
    },
    card: {
        marginVertical: 8,
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    cardContent: {
        padding: 16,
        alignItems: 'center',
    },
    text: {
        color: 'black',
    },
});

export default StudentList;
