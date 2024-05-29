const {firestore} = require('../firebase/firestore');
const db = firestore;

async function getTeacherClass(teacherId) {
    const classRef = db.collection('Class').where('tid', '==', teacherId);
    const snapshot = await classRef.get();
    return snapshot.docs.map(doc => doc.data());
}

async function getTeacherStudents(teacherId) {
    try {
        const classRef = db.collection('Class').where('tid', '==', teacherId);
        const classSnapshot = await classRef.get();

        if (classSnapshot.empty) {
            console.log(`No class found for teacher ID: ${teacherId}`);
            return [];
        }

        const classData = classSnapshot.docs.map(doc => doc.data())[0];
        const classId = parseInt(classData.id);

        const studentsSnapshot = await db.collection('Student')
            .get();

        const students = studentsSnapshot.docs.map(doc => doc.data())
            .filter(student => {
                const regNo = parseInt(student.regNo);
                return regNo >= classId * 100 && regNo < (classId + 1) * 100;
            });

        if (students.length === 0) {
            console.log(`No students found for class ID: ${classId}`);
            return [];
        }
        return students.map(student => {
            const activeSession = student.session.find(s => s.status === 'Active');
            return {
                regNo: student.regNo,
                name: student.name,
                gender: student.gender,
                session: activeSession ? activeSession : null,
            }
        });
    } catch (error) {
        console.error(`Error fetching students for teacher ID ${teacherId}:`, error);
        throw error;
    }
}

module.exports = { getTeacherClass, getTeacherStudents };