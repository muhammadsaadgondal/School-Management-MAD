import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import { Table, Row, Rows } from 'react-native-table-component';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import firestore from '@react-native-firebase/firestore';

const StudentAgeReport = () => {
  const [students, setStudents] = useState([]);
  const [boyCount, setBoyCount] = useState(0);
  const [girlCount, setGirlCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentSnapshot = await firestore().collection('Student').get();
        const studentData = studentSnapshot.docs.map(doc => doc.data());
        setStudents(studentData);
        const boys = studentData.filter(student => student.gender === 'male').length;
        const girls = studentData.filter(student => student.gender === 'female').length;
        setBoyCount(boys);
        setGirlCount(girls);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    const yearAndMonth = month < 0 ? `${age - 1} years ${12 + month} months` : `${age} years ${month} months`;
    return yearAndMonth;
  };

  const tableHead = ['Registration No', 'Student Name', 'Father Name', 'Date of Birth', 'Age'];
  const tableData = students.map(student => [
    student.regNo,
    student.name,
    student.father.name,
    student.DoB,
    calculateAge(student.DoB)
  ]);

  const generatePDF = async () => {
    const html = `
      <html>
      <head>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid black;
            text-align: center;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h2>Student Age Report</h2>
        <p>Total Boys: ${boyCount}</p>
        <p>Total Girls: ${girlCount}</p>
        <table>
          <tr>
            <th>Registration No</th>
            <th>Student Name</th>
            <th>Father Name</th>
            <th>Date of Birth</th>
            <th>Age</th>
          </tr>
          ${tableData.map(row => `
            <tr>
              <td>${row[0]}</td>
              <td>${row[1]}</td>
              <td>${row[2]}</td>
              <td>${row[3]}</td>
              <td>${row[4]}</td>
            </tr>
          `).join('')}
        </table>
      </body>
      </html>
    `;

    try {
      const pdf = await RNHTMLtoPDF.convert({
        html,
        fileName: 'student_age_report',
        base64: true,
      });

      const shareOptions = {
        title: 'Student Age Report',
        url: `file://${pdf.filePath}`,
        type: 'application/pdf',
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while generating the PDF');
    }
  };

  return (
    <View style={tw`flex-1 p-4 bg-white`}>
      <Text style={tw`text-2xl font-bold mb-4 text-center`}>Student Age Report</Text>
      <ScrollView horizontal>
        <View>
          <Table borderStyle={styles.tableBorder}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={styles.tableBorder}>
              {loading ? (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size="large" color="#0000ff" />
                  <Text style={tw`mt-4 text-lg`}>Students are being fetched, please wait...</Text>
                </View>
              ) : (
                <Rows data={tableData} textStyle={{ ...styles.text }} />
              )}
            </Table>
          </ScrollView>

        </View>
      </ScrollView>
      {!loading && (
        <View style={tw`mt-4`}>
          <Text style={tw`text-lg`}>Total Boys: {boyCount}</Text>
          <Text style={tw`text-lg`}>Total Girls: {girlCount}</Text>
        </View>
      )}
      <Button title="Download PDF" onPress={generatePDF} />
    </View>
  );
};

const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, textAlign: 'center', color: 'black' },
   borderStyle : {
    borderWidth: 1,
    borderColor: '#c8e1ff'
  },
  
  loaderContainer: { justifyContent: 'center', alignItems: 'center', padding: 20 },
  dataWrapper: { marginTop: -1 }
});

export default StudentAgeReport;
