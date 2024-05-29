const {firestore} = require('../firebase/firestore');
const db = firestore;

const getAllStudents = async () => {
    const students = [];
    const studentRef = db.collection('Student').orderBy('regNo');
    const snapshot = await studentRef.get();
    snapshot.forEach(doc => {
        students.push(doc.data());
    });
    return students;
};

const getStudent = async (regNo) => {
    const studentRef = db.collection('Student').doc(regNo);
    const doc = await studentRef.get();
    if (!doc.exists) {
        console.log('No such document!');
        return null;
    } else {
        return doc.data();
    }
}

module.exports = {getAllStudents, getStudent};