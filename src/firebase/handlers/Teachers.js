

import firestore from '@react-native-firebase/firestore';

const fetchTeacher = async (tid) => {
    try {
        const teacherDoc = await firestore().collection('Teacher').doc(tid).get();
        return teacherDoc.exists ? teacherDoc.data() : null;
    } catch (error) {
        console.error('Error fetching teacher:', error);
        return null;
    }
}

const fetchAvailableTeachers = async () => {
    try {
        const querySnapshot = await firestore()
            .collection('Teacher')
            .where('assigned', '==', '0')
            .get();

        const teachers = querySnapshot.docs.map(doc => doc.data());
        return teachers;
    } catch (error) {
        console.error('Error fetching teachers:', error);
        return [];
    }
}

export { fetchTeacher, fetchAvailableTeachers };