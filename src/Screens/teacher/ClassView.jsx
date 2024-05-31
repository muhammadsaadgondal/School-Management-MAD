import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    ImageBackground,
  } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const StudentList = () => {
const students = [
{
    regNo: '201',
    name: 'Tony Hilpert',
    gender: 'female',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '202',
    name: 'Lionel Crist III',
    gender: 'male',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '203',
    name: 'Jake Ernser',
    gender: 'male',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '204',
    name: 'Nichole Dicki',
    gender: 'female',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '205',
    name: 'Hugo Hansen',
    gender: 'female',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '206',
    name: 'Myron Keebler',
    gender: 'female',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '207',
    name: 'Penny Olson',
    gender: 'female',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '208',
    name: 'Grant Quitzon',
    gender: 'male',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '209',
    name: 'Dorothy Runte',
    gender: 'male',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '210',
    name: 'Clayton Lesch',
    gender: 'male',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '211',
    name: 'Mr. Felix Trantow',
    gender: 'female',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '212',
    name: 'Michelle Veum',
    gender: 'female',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '213',
    name: 'Dexter Hammes',
    gender: 'male',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '214',
    name: 'Michelle Volkman',
    gender: 'male',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '215',
    name: 'Nelson Yundt',
    gender: 'male',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '216',
    name: 'Chris Nikolaus',
    gender: 'male',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '217',
    name: 'Doug Beier PhD',
    gender: 'male',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '218',
    name: 'Keith Yundt',
    gender: 'female',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '219',
    name: 'Shane Larson',
    gender: 'male',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '220',
    name: 'Eunice Toy',
    gender: 'female',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '221',
    name: 'Ellen Mueller IV',
    gender: 'female',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '222',
    name: 'Wilma Stokes',
    gender: 'female',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '223',
    name: 'Omar Brown V',
    gender: 'male',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '224',
    name: 'Jon Botsford III',
    gender: 'male',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
},
{
    regNo: '225',
    name: 'Sonia Cassin',
    gender: 'female',
    session: { year: 2024, subjects: [Array], class: '2', status: 'Active' }
}
];

return (
    <SafeAreaView style={styles.container}>
    <ImageBackground
        source={{
        uri: 'https://img.freepik.com/free-vector/gradient-dynamic-blue-lines-background_23-2148995756.jpg',
        }}
        style={styles.imageBackground}
    >
        <View style={styles.header}>
        <Text style={styles.headerText}>Class: {students[0].session.class}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {students.map((student, index) => (
            <Card key={index} style={styles.card}>
            <Card.Content style={styles.cardContent}>
                <Title style={styles.text}>{student.name}</Title>
                <Paragraph style={styles.text}>
                Reg. #: {student.regNo} Gender:{student.gender}
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
