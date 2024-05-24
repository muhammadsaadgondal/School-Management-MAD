import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Icon, IconButton, Text } from "react-native-paper";
import tw from 'twrnc';



const InfoCard = ({data}) => {

    return (

        data.map((classInfo, index) => (
            <TouchableOpacity
                key={index}
                style={tw`mt-2 mb-2 ml-4 mr-4 pt-2 pb-2  bg-indigo-700 rounded-lg `}
                 // Adding delayPressIn
                onPress={() => console.log("Pressed")}
            >
                <IconButton
                            icon="progress-pencil"
                            size={20}
                            iconColor='white'
                            style={tw`absolute top--2 right-6  `} // Apply Tailwind positioning
                            onPress={() => console.log('Icon pressed')}
                        />
                       <IconButton
                            icon="close-circle"
                            size={20}
                            iconColor='white'
                            style={tw`absolute top--2 right--2  `} // Apply Tailwind positioning
                            onPress={() => console.log('Icon pressed')}
                        />
                <View style={tw`flex-row justify-start items-center `}>

                    <Icon source="account-box" size={40} color='white' />
                    <View style={tw` ml-3`} >

                        <Text style={tw`text-lg text-white`}>Grade: {classInfo.grade}</Text>
                        <View style={tw`flex-row justify-start items-center `}>

                            <Text style={tw`text-sm text-gray-300`}>
                                Class Teacher:  {classInfo.teacher.name}
                            </Text>
                            <Text style={tw`text-sm ml-3 text-gray-300 `}>{classInfo.students.length} students</Text>
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