const {firestore} = require('../firebase/firestore');
const db = firestore;

const {getStudent} = require('./studentHandler');

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
            const activeSession = student.session.find(s => s.status === 'Active' && s.class == classId);
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

async function updateMarks(regNo, subjectName, marks) {
    try {
        const student = await getStudent(regNo);
        if (!student) {
            throw new Error(`Student with regNo ${regNo} not found`);
        }

        let updated = false;
        for (let i = 0; i < student.session.length; i++) {
            if (student.session[i].status === 'Active') {
                student.session[i].subjects.forEach(subject => {
                    if (subject.name === subjectName) {
                        subject.finalTerm = marks.finalTerm;
                        subject.midTerm = marks.midTerm;
                        subject.firstTerm = marks.firstTerm;
                        updated = true;
                    }
                });
            }
        }

        if (!updated) {
            throw new Error(`Subject ${subjectName} not found in active session for student with regNo ${regNo}`);
        }

        // Update the student data back to the database
        const studentRef = db.collection('Student').doc(regNo.toString());
        await studentRef.update(student);

        console.log(`Marks updated successfully for student with regNo ${regNo} in subject ${subjectName}`);
    } catch (error) {
        console.error('Error updating marks:', error);
    }
}

module.exports = { getTeacherClass, getTeacherStudents, updateMarks };