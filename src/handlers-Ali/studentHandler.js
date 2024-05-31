import firestore from '@react-native-firebase/firestore';

const getAllStudents = async () => {
    const students = [];
    const studentRef = firestore().collection('Student').orderBy('regNo');
    const snapshot = await studentRef.get();
    snapshot.forEach(doc => {
        students.push(doc.data());
    });
    return students;
};

const getStudent = async (regNo) => {
    const studentRef = firestore().collection('Student').doc(regNo);
    const doc = await studentRef.get();
    if (!doc.exists) {
        console.log('No such document!');
        return null;
    } else {
        return doc.data();
    }
}

module.exports = {getAllStudents, getStudent};