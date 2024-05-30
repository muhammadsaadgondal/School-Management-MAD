import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Checkbox, Searchbar, Avatar, IconButton } from 'react-native-paper';
import tw from 'twrnc';
import { fetchAvailableTeachers } from '../../firebase/handlers/Teachers';
import { delStudents, getNonAssignedStudents, updateClassStudents } from '../../firebase/handlers/Student';
import { updateClassTeacher } from '../../firebase/handlers/Class';
import { ActivityIndicator } from 'react-native-paper';

// Placeholder values for grades
const gradeLabels = [
  'Nursery', 'KG', 'Grade 1', 'Grade 2', 'Grade 3',
  'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8'
];

const RegisterScreen = ({ route, navigation }) => {
  const { classInfo, students, teacherInfo, reload } = route.params;

  const [updating, setUpdating] = useState(false);

  const [selectedStudents, setSelectedStudents] = useState(students?.map((student) => student.regNo) || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [teacherName, setTeacherName] = useState(teacherInfo?.name || 'None');
  const [allAvailableStudents, setAllAvailableStudents] = useState([]);
  const [availableTeachers, setAvailableTeachers] = useState(teacherInfo ? teacherInfo : []);
  const [teacherOpen, setTeacherOpen] = useState(false);
  const [teachers, setTeachers] = useState([{
    label: teacherInfo?.name,
    value: teacherInfo?.name
  }, {
    label: 'None',
    value: 'None'
  }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTeachers = await fetchAvailableTeachers();
        setAvailableTeachers(fetchedTeachers);
        setTeachers([
          { label: 'Select Teacher', value: '' },
          ...fetchedTeachers.map((teacher) => ({ label: teacher.name, value: teacher.name })),
          ...(teacherInfo && !fetchedTeachers.some(t => t.name === teacherInfo.name)
            ? [{ label: teacherInfo.name, value: teacherInfo.name }] : [])
        ]);
        const nonAssignedStudents = await getNonAssignedStudents();
        setAllAvailableStudents(nonAssignedStudents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const onChangeSearch = (query) => setSearchQuery(query);

  const toggleStudentSelection = (studentRegNo) => {
    setSelectedStudents((prevSelectedStudents) => {
      if (prevSelectedStudents.includes(studentRegNo)) {
        return prevSelectedStudents.filter((id) => id !== studentRegNo);
      } else {
        if (prevSelectedStudents.length > 25) {
          Alert.alert('Limit Reached', 'Only 25 students can be added.');
          return prevSelectedStudents;
        }
        return [...prevSelectedStudents, studentRegNo];
      }
    });
  };

  const filteredStudents = [...students, ...allAvailableStudents].filter((student, index, self) =>
    index === self.findIndex((s) => s.regNo === student.regNo) // Remove duplicates
  ).filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSelectedAndNotSelectedStudents = () => {
    const selectedStudentObjects = filteredStudents.filter(student => selectedStudents.includes(student.regNo));
    const notSelectedStudentObjects = filteredStudents.filter(student => !selectedStudents.includes(student.regNo));
    return { selectedStudentObjects, notSelectedStudentObjects };
  };

  const updateClassInfo = async () => {
    setUpdating(true);
    console.log('Updating class...');
    const { selectedStudentObjects, notSelectedStudentObjects } = getSelectedAndNotSelectedStudents();
    // console.log('Selected students:', selectedStudentObjects);
    // console.log('Not selected students:', notSelectedStudentObjects);

    await updateClassTeacher(classInfo.id, teacherName);
    await updateClassStudents(classInfo.id, selectedStudentObjects, notSelectedStudentObjects);
    reload();
    navigation.navigate('ManageClasses');
  };

  return (
    <View style={tw`flex-1 bg-indigo-100 justify-center`}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={tw`flex-grow justify-center items-center px-4 `}
      >
        <Text style={tw`text-2xl text-indigo-700 font-bold p-4`}>
          {classInfo === undefined ? 'Register Class' : 'Update Class Info'}
        </Text>

        <View style={tw`bg-indigo-700 p-3 mb-2 w-full rounded-lg shadow-lg`}>
          <Text style={tw`text-base text-white`}>Grade: {gradeLabels[classInfo.id]}</Text>
        </View>

        <DropDownPicker
          open={teacherOpen}
          value={teacherName}
          items={teachers}
          setOpen={setTeacherOpen}
          setValue={setTeacherName}
          containerStyle={tw`h-10 mb-5 w-full`}
          style={tw`bg-white`}
          dropDownContainerStyle={tw`bg-indigo-300 text-white`}
          placeholder="Select Teacher"
          zIndex={3000}
          zIndexInverse={3000}
        />

        <View style={tw`bg-indigo-700 p-4 rounded-lg shadow-lg mb-4 w-full`}>
          <Text style={tw`text-xl text-white font-bold mb-2`}>Subjects</Text>
          {chunkArray(classInfo.subjects, 3).map((rowSubjects, rowIndex) => (
            <View key={rowIndex} style={tw`flex flex-row justify-start items-center`}>
              {rowSubjects.map((subject, subjectIndex) => (
                <TouchableOpacity key={subjectIndex} style={tw`bg-indigo-100 px-1.5 py-1 rounded-full mr-2 mb-2`} onPress={() => console.log(subject)}>
                  <Text style={tw`text-indigo-800`} numberOfLines={1} ellipsizeMode='tail'>{subject}</Text>
                </TouchableOpacity>
              ))}
              {rowSubjects.length < 3 && (
                <View style={tw`flex-grow`} />
              )}
            </View>
          ))}
        </View>

        <Searchbar
          placeholder="Search for Students"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={tw`w-full bg-indigo-300`}
        />

        <View style={tw`bg-indigo-700 m-4 p-4 rounded-lg shadow-lg mb-4 w-full max-h-50`}>
          <Text style={tw`text-xl font-bold mb-2 text-white`}>Students</Text>
          <ScrollView style={tw`flex: 1`}>
            {filteredStudents.map((student) => (
              <View key={student.regNo} style={tw`bg-indigo-300 rounded-lg shadow-lg mb-4`}>
                <View style={tw`flex-row items-center`}>
                  <Checkbox
                    status={selectedStudents.includes(student.regNo) ? 'checked' : 'unchecked'}
                    onPress={() => toggleStudentSelection(student.regNo)}
                    style={tw`mr-2`}
                  />
                  <Avatar.Image
                    size={35}
                    source={{ uri: 'https://via.placeholder.com/150' }}
                    style={tw`mr-2`}
                  />
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-base font-bold`}>{student.name}</Text>
                    <Text style={tw`text-sm`}>{`Reg No: ${student.regNo}`}</Text>
                    <Text style={tw`text-sm`}>{`Gender: ${student.gender}`}</Text>
                  </View>
                  <IconButton
                    icon="information"
                    color={tw.color('indigo-700')}
                    size={20}
                    onPress={() => navigation.navigate('Profile', { profileData: student, profileType: 'student' })}
                  />
                </View>
              </View>
            ))}
            {filteredStudents.length === 0 && (
              <Text style={tw`text-center text-gray-500`}>No students found.</Text>
            )}
          </ScrollView>
        </View>


        <TouchableOpacity style={tw`bg-indigo-700 p-3 rounded-lg w-full mt-1`} onPress={() => updateClassInfo()}>
          {updating ? <ActivityIndicator animating={true} color={'white'} />
            :
            <Text style={tw`text-white text-center`}>Update</Text>
          }
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;

function chunkArray(arr, chunkSize) {
  return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (_, index) =>
    arr.slice(index * chunkSize, index * chunkSize + chunkSize)
  );
}
