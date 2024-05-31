import firestore from '@react-native-firebase/firestore'

const {getStudent} = require('./studentHandler');

async function getTeacherClass(teacherId) {
    const classRef = firestore().collection('Class').where('tid', '==', teacherId);
    const snapshot = await classRef.get();
    return snapshot.docs.map(doc => doc.data());
}

async function getTeacherStudents(teacherId) {
    try {
        const classRef = firestore().collection('Class').where('tid', '==', teacherId);
        const classSnapshot = await classRef.get();

        if (classSnapshot.empty) {
            console.log(`No class found for teacher ID: ${teacherId}`);
            return [];
        }

        const classData = classSnapshot.docs[0].data();
        const classId = classData.id.toString();

        const studentsSnapshot = await firestore().collection('Student').where('regNo', '>=', classId + '00')
                                                       .where('regNo', '<', (parseInt(classId) + 1).toString() + '00')
                                                       .get();

        if (studentsSnapshot.empty) {
            console.log(`No students found for class ID: ${classId}`);
            return [];
        }

        let students = studentsSnapshot.docs.map(doc => doc.data());
        students = students.map(student => {
            const activeSession = student.session.find(s => s.status === 'Active' && s.class == classId);
            return {
                regNo: student.regNo,
                name: student.name,
                gender: student.gender,
                session: activeSession ? activeSession : null,
            }
        });
        return students.filter(student => student.session);
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
        const studentRef = firestore().collection('Student').doc(regNo.toString());
        await studentRef.update(student);

        console.log(`Marks updated successfully for student with regNo ${regNo} in subject ${subjectName}`);
    } catch (error) {
        console.error('Error updating marks:', error);
    }
}

export { getTeacherClass, getTeacherStudents, updateMarks };