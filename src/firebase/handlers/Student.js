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



const getXYClassStudents = async (cid) => {
    const students = [];
    const studentRef = firestore().collection('Student').orderBy('regNo');
    const snapshot = await studentRef.get();
    snapshot.forEach(doc => {
        if (doc.data().regNo.startsWith(cid)) {
            students.push(doc.data());
        }
    });
    return students;

}


const getClassStudents = async (cid) => {
    const students = [];
    const studentRef = firestore().collection('Student').orderBy('regNo');
    const snapshot = await studentRef.get();
    snapshot.forEach(doc => {
        if (doc.data().regNo.startsWith(cid) && doc.data().session[doc.data().session.length - 1].status === 'Active') {
            students.push(doc.data());
        }
    });
    return students;

}

const getNonAssignedStudents = async () => {
    const students = [];
    try {
        const studentRef = await firestore().collection('Student').get(); // Corrected the typo here
        // console.log("Fetching students");
        studentRef.forEach((doc) => {
            const data = doc.data();
            const lastSession = data.session[data.session.length - 1];
            if (lastSession && lastSession.status === 'Hold') {
                students.push(data);
            }
        });
        return students;
    } catch (error) {
        console.error("Error fetching students: ", error);
        return [];
    }
};


const delStudents = async (studentsToDel) => {
    const batch = firestore().batch();
    studentsToDel.forEach(student => {
        const studentRef = firestore().collection('Student').doc(student.regNo);
        batch.delete(studentRef);
    });
    await batch.commit();
}

const getClassSubjects = async (cid) => {
    const classRef = firestore().collection('Class').doc(cid);

    const doc = await classRef.get();
    if (!doc.exists) {
        console.log('No such document!');
        return null;
    } else {
        const subjects = doc.data().subjects.map(subjectName => ({
            name: subjectName,
            firstTerm: 0,
            midTerm: 0,
            finalTerm: 0
        }));
        return subjects;
    }

}

const updateStudent = async (regNo, student) => {
    // Example implementation using Firebase
    try {
        await firestore().collection('Student').doc(regNo).set(student);
        // console.log(`Student ${regNo} updated successfully`);
    } catch (error) {
        console.error(`Error updating student ${regNo}:`, error);
    }
};

const updateClassStudents = async (classId, selectedStudents, notSelected) => {
    try {
        console.log("Updating Students");
        // Fetch the current class students
        const classStudents = await getXYClassStudents(classId);

        // Get the highest regNo in the class for assigning new regNo to new students
        const highestRegNo = classStudents[classStudents.length - 1].regNo;

        // Fetch class subjects once outside the loop
        const classSubjects = await getClassSubjects(classId);

        // Updating not selected students
        for (const student of notSelected) {
            const lastSessionIndex = student.session.length - 1;
            student.session[lastSessionIndex].status = 'Hold';
            // Update student record in the database
            await updateStudent(student.regNo, student);  // Assuming updateStudent is a function that updates student details
        }

        // Updating selected students
        for (const student of selectedStudents) {
            const matchingStudents = classStudents.filter(s => s.regNo === student.regNo);
            if (matchingStudents.length > 0) {
                // Student is already part of the class, update the session status to 'Active'
                const existingStudent = matchingStudents[0]; // Assuming there's only one matching student
                const lastSessionIndex = existingStudent.session.length - 1;
                existingStudent.session[lastSessionIndex].status = 'Active';
                // Update student record in the database
                await updateStudent(existingStudent.regNo, existingStudent);
            } else {
                // New student, add a new session and assign a new regNo
                const tempReg=student.regNo;
                const newRegNo = (parseInt(highestRegNo, 10) + 1).toString().padStart(3, '0');
                student.regNo = newRegNo;
                student.session.push({
                    year: new Date().getFullYear().toString(),
                    class: classId,
                    subjects: classSubjects,  // Reuse fetched subjects
                    status: 'Active'
                });
                // Update student record in the database
                await firestore().collection('Student').doc(tempReg).delete();
                await updateStudent(student.regNo, student);
            }
        }

        console.log('Class students updated successfully');
        return;
    } catch (error) {
        console.error('Error updating class students:', error);
        // Handle the error appropriately, e.g., show an error message to the user or log it
    }
};






export { getAllStudents, getStudent, getClassStudents, delStudents, getNonAssignedStudents, updateClassStudents };