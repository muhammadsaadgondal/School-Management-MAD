

import firestore from '@react-native-firebase/firestore';

const fetchTeachers = async (tid) => {
    try {
        const teacherDoc = await firestore().collection('Teacher').doc(tid).get();
        return teacherDoc.exists ? teacherDoc.data() : null;
    } catch (error) {
        console.error('Error fetching teacher:', error);
        return null;
    }
}

export { fetchTeachers };