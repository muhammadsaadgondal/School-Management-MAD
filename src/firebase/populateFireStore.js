
const admin = require('firebase-admin');

const serviceAccount = require('./school-management-system-3b44a-firebase-adminsdk-gi2vb-1e81d4008a.json');
const createRandomStudent = require('./faker.js');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();
const allStudentData = []; // Array to store all student data

// Loop through grades 2 to 10
for (let grade = 0; grade < 10; grade++) {
    const gradeStudentData = []; // Array to store student data for the current grade
    
    // Generate student data 25 times for each grade
    for (let i = 0; i < 25; i++) {
        const student = createRandomStudent(grade, i + 1); // Generate student data
        gradeStudentData.push(student); // Add student data to the array for the current grade
    }
    
    // Add student data for the current grade to the array containing all student data
    allStudentData.push(...gradeStudentData);
}

  
const populateStudents = async () => {
    const studentCollection = firestore.collection('Student');

    for (const student of allStudentData) {
        try {
            const docRef = await studentCollection.add({
                regNo: student.regNo,
                name: student.name,
                DoA: student.DoA,
                DoB: student.DoB,
                gender: student.gender,
                father:student.father,
                loginCred: student.loginCred,
                remarks: student.remarks,
                fee: student.fee,
                session: student.session

            });
            console.log(`${docRef.id} (tid: ${student.tid}) added!`);
        } catch (error) {
            console.error("Error adding document:", error);
        }
    }

    console.log('====================================');
    console.log("Data population completed");
    console.log('====================================');
};

const populateClasses = async () => {
    const classCollection = firestore.collection('Class');

    for (const teacher of classes) {
        try {
          const docRef = classCollection.doc(teacher.tid); // Specify tid as the document ID
          await docRef.set({
            name: teacher.name,
            dob: teacher.dob,
            gender: teacher.gender,
            loginCred: teacher.loginCred,
            DoJ: teacher.DoJ,
            pay: teacher.pay,
            assigned: teacher.assigned,
            subject: teacher.subject
          });
          console.log(`${docRef.id} (tid: ${teacher.tid}) added!`);
        } catch (error) {
          console.error("Error adding document:", error);
        }
      }

    console.log('====================================');
    console.log("Data population completed");
    console.log('====================================');
};
// Execute the script directly

populateStudents();

