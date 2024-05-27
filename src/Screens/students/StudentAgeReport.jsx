import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import tw from 'twrnc';
import { Table, Row, Rows } from 'react-native-table-component';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const StudentAgeReport = () => {

  const tableHead = ['Registration No', 'Student Name', 'Father Name', 'Date of Birth', 'Age'];
  const tableData = [
    ['123', 'John Doe', 'Mr. Doe', '01/01/2010', '14 years 4 months'],
    ['124', 'Jane Doe', 'Mr. Doe', '02/02/2011', '13 years 3 months'],
    // Add more data as needed
  ];

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
    }
  };

  return (
    <View style={tw`flex-1 p-4 bg-black`}>
      <Text style={tw`text-2xl font-bold mb-4 text-center`}>Student Age Report</Text>
      <ScrollView horizontal>
        <View>
          <Table borderStyle={styles.tableBorder}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={tableData} textStyle={styles.text} />
          </Table>
        </View>
      </ScrollView>
      <Button title="Download PDF" onPress={generatePDF} />
    </View>
  );
};

const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, textAlign: 'center' },
  tableBorder: { borderWidth: 1, borderColor: '#c8e1ff' },
});

export default StudentAgeReport;
