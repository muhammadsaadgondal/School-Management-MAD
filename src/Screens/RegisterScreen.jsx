import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Checkbox, Searchbar, Avatar, IconButton } from 'react-native-paper';
import tw from 'twrnc';

const teachers = [
  { label: 'Mr. Smith', value: 'Smith' },
  { label: 'Ms. Johnson', value: 'Johnson' },
  { label: 'Mrs. Brown', value: 'Brown' },
];
const teachingSubjects = [
  { label: 'Math', value: 'Math' },
  { label: 'Science', value: 'Science' },
  { label: 'English', value: 'English' },
  { label: 'Islamiyat', value: 'Islamiyat' },
  { label: 'Urdu', value: 'Urdu' },
  { label: 'Chemistry', value: 'Chemistry' },
  { label: 'Physics', value: 'Physics' },
];

const RegisterScreen = (props) => {
  const [grade, setGrade] = useState(null);
  const [teacherName, setTeacherName] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);


  const [searchQuery, setSearchQuery] = useState('');

  const [gradeOpen, setGradeOpen] = useState(false);
  const [teacherOpen, setTeacherOpen] = useState(false);
  const [subjectOpen, setSubjectOpen] = useState(false);

  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Michael Johnson' },
    // Add more students here
  ]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const handleAddSubject = () => {
    setSubjects([...selectedSubjects]);
  };

  const onChangeSearch = (query) => setSearchQuery(query);

  const toggleStudentSelection = (studentId) => {
    setSelectedStudents((prevSelectedStudents) => {
      if (prevSelectedStudents.includes(studentId)) {
        return prevSelectedStudents.filter((id) => id !== studentId);
      } else {
        return [...prevSelectedStudents, studentId];
      }
    });
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={tw`flex-1 bg-blue-800 justify-center`}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={tw`flex-grow justify-center items-center px-4 `}>



        {/* Fields for Grade and Teacher Name */}
        <Text style={tw`text-2xl text-white font-bold  p-8`}>Register Class</Text>
        <DropDownPicker
          open={gradeOpen}
          value={grade}
          items={[
            { label: 'Grade 1', value: '1' },
            { label: 'Grade 2', value: '2' },
            { label: 'Grade 3', value: '3' },
            { label: 'Grade 4', value: '4' },
            { label: 'Grade 5', value: '5' },
            { label: 'Grade 6', value: '6' },
            { label: 'Grade 7', value: '7' },
            { label: 'Grade 8', value: '8' },
          ]}
          setOpen={setGradeOpen}
          setValue={setGrade}
          containerStyle={tw`h-12 mb-5 w-full`}
          style={tw`bg-white`}
          dropDownContainerStyle={tw`bg-white`}
          placeholder="Select Grade"
          zIndex={3000}
          zIndexInverse={1000}
        />

        <DropDownPicker
          open={teacherOpen}
          value={teacherName}
          items={teachers}
          setOpen={setTeacherOpen}
          setValue={setTeacherName}
          containerStyle={tw`h-12 mb-5 w-full`}
          style={tw`bg-white`}
          dropDownContainerStyle={tw`bg-white`}
          placeholder="Select Teacher"
          zIndex={2000}
          zIndexInverse={2000}
        />

        <View style={tw`flex-row relative`}>
          <DropDownPicker
            open={subjectOpen}
            value={selectedSubjects}
            items={teachingSubjects}
            setOpen={setSubjectOpen}
            setValue={setSelectedSubjects}
            containerStyle={tw`h-10 flex-1`}
            style={tw`h-full bg-white relative z-10`}
            dropDownContainerStyle={tw`bg-white`}
            placeholder="Select Subjects"
            multiple={true}
            zIndex={1000}
            zIndexInverse={3000}
            min={0} // Minimum number of items that can be selected
            max={teachingSubjects.length} // Maximum number of items that can be selected (optional)
            onChangeItem={(items) => setSelectedSubjects(items.map(item => item.value))}
            renderBadge={(item) => (
              <Checkbox
                status={selectedSubjects.includes(item.value) ? 'checked' : 'unchecked'}
                onPress={() => setSelectedSubjects((prevSelected) =>
                  prevSelected.includes(item.value)
                    ? prevSelected.filter(value => value !== item.value)
                    : [...prevSelected, item.value]
                )}
              />
            )}
          />
          <TouchableOpacity
            style={tw`bg-green-500 ml-4 p-3 rounded-lg h-full relative z-10`}
            activeOpacity={0.5}
            onPress={handleAddSubject}>
            <Text style={tw`text-white text-sm`}>Add Subjects</Text>
          </TouchableOpacity>
        </View>

        {/* Dynamic list of subjects */}
        <View style={tw`bg-white m-4 p-4 rounded-lg shadow-lg mb-4 w-full relative z-0`}>
          <Text style={tw`text-xl font-bold mb-2`}>Subjects</Text>
          {chunkArray(subjects, 3).map((rowSubjects, rowIndex) => (
            <View key={rowIndex} style={tw`flex-row justify-center items-center`}>
              {rowSubjects.map((subject, subjectIndex) => (
                <TouchableOpacity key={subjectIndex} style={tw`bg-indigo-200 px-3 py-2 rounded-full mx-2 mb-2`}>
                  <Text style={tw`text-indigo-800`}>{subject}</Text>
                </TouchableOpacity>
              ))}
              {Array.from({ length: 3 - rowSubjects.length }).map((_, idx) => (
                <View key={idx} style={tw`mx-2 mb-2`} />
              ))}
            </View>
          ))}
        </View>



        {/* Search Bar for Students */}
        <Searchbar
          placeholder="Search for Students"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={tw` w-full bg-indigo-100`}
        />

        <View style={tw`bg-white m-4 p-4 rounded-lg shadow-lg mb-4 w-full h-60`}>
          <Text style={tw`text-xl font-bold mb-2`}>Students</Text>
          <View style={tw`max-h-40`}>
            <ScrollView contentContainerStyle={tw`p-2 `}>
              {filteredStudents.map((student) => (
                <View key={student.id} style={tw`bg-indigo-100  rounded-lg shadow-lg mb-4 `}>
                  <View style={tw`flex-row items-center`}>
                    <Checkbox
                      status={selectedStudents.includes(student.id) ? 'checked' : 'unchecked'}
                      onPress={() => toggleStudentSelection(student.id)}
                      style={tw`mr-2`}
                    />
                    <Avatar.Image
                      size={35} // Adjust the size as needed
                      source={{ uri: 'https://via.placeholder.com/150' }}
                      style={tw`mr-2`}
                    />
                    <View style={tw`flex-1`}>
                      <Text style={tw`text-base font-bold`}>{student.name}</Text>
                    </View>
                    <IconButton
                      icon="information"
                      color={tw.color('indigo-700')}
                      size={20} // Adjust the size as needed
                      onPress={() => console.log('Info Pressed')}
                    />
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
        <TouchableOpacity style={tw`bg-green-500 p-3 rounded-lg w-full mt-5 mb-10`} onPress={() => console.log('Register Button Pressed')}>
          <Text style={tw`text-white text-center`}>Register</Text>
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
