import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Icon, IconButton, Text } from "react-native-paper";
import tw from 'twrnc';


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


const InfoCard = () => {




    return (

        data.map((classInfo, index) => (
            <TouchableOpacity
                key={index}
                style={tw`mt-2 mb-2 ml-4 mr-4 pt-2 pb-2  bg-indigo-100 rounded-lg `}
                 // Adding delayPressIn
                onPress={() => console.log("Pressed")}
            >
                <IconButton
                            icon="progress-pencil"
                            size={20}
                            iconColor='gray'
                            style={tw`absolute top--2 right-6  `} // Apply Tailwind positioning
                            onPress={() => console.log('Icon pressed')}
                        />
                       <IconButton
                            icon="close-circle"
                            size={20}
                            iconColor='gray'
                            style={tw`absolute top--2 right--2  `} // Apply Tailwind positioning
                            onPress={() => console.log('Icon pressed')}
                        />
                <View style={tw`flex-row justify-start items-center `}>

                    <Icon source="account-box" size={40} />
                    <View style={tw` ml-3`} >

                        <Text style={tw`text-lg`}>Grade: {classInfo.grade}</Text>
                        <View style={tw`flex-row justify-start items-center `}>

                            <Text style={tw`text-sm text-gray-500`}>
                                Class Teacher:  {classInfo.teacher.name}
                            </Text>
                            <Text style={tw`text-sm ml-3 text-gray-500 `}>{classInfo.students.length} students</Text>
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