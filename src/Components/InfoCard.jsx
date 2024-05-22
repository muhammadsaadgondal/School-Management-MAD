import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";
import tw from 'twrnc';

const InfoCard = () => {

    const data = [
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
        }
    ];

    console.log(data);


    return (
        data.map((classInfo, index) => (
            <TouchableOpacity key={index} style={tw`mt-2 mb-2 ml-4 mr-4 android:pt-2  bg-indigo-200 rounded-lg `} >
                <View style={tw`flex-row justify-left items-center `}>

                    <Button style={tw`rounded-lg`} icon={{ uri: 'https://avatars0.githubusercontent.com/u/17571969?v=3&s=400' }}></Button>
                    <View>

                        <Text style={tw`text-lg`}>Grade: {classInfo.grade}</Text>
                        <View style={tw`flex-row justify-left items-center`}>

                            <Text style={tw`text-md`}>
                                Class Teacher:  {classInfo.teacher.name}
                            </Text>
                            <Text style={tw`text-sm ml-3 `}>{classInfo.students.length} students</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        ))
    );
}


const styles = StyleSheet.create({
    classContainer: {
        borderRadius: '1px solid black'
    }
})

export default InfoCard;