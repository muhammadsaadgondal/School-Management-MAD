
const admin = require('firebase-admin');
const serviceAccount = require('./student-portal-75a20-firebase-adminsdk-kwdj9-7cf35550a7.json');
const createRandomStudent = require('./faker.js');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();
const studentData = Array.from({ length: 25 }, () => createRandomStudent());

//   const classes = [
//       {
//           "id": 0,
//           "tid": "teacher1",
//           "subject": ["English", "Urdu", "Math", "Nazra-e-Quran"]
//       },
//       {
//           "id": 1,
//           "tid": "teacher2",
//           "subject": ["English", "Urdu", "Math", "Nazra-e-Quran", "General Knowledge"]
//       },
//       {
//           "id": 2,
//           "tid": "teacher3",
//           "subject": ["English", "Urdu", "Math", "General Knowledge", "Islamyat"]
//       },
//       {
//           "id": 3,
//           "tid": "teacher4",
//           "subject": ["English", "Urdu", "Math", "General Knowledge", "Islamyat", "Computer"]
//       },
//       {
//           "id": 4,
//           "tid": "teacher5",
//           "subject": ["English", "Urdu", "Math", "General Knowledge", "Islamyat", "Computer"]
//       },
//       {
//           "id": 5,
//           "tid": "teacher6",
//           "subject": ["English", "Urdu", "Math", "General Knowledge", "Social Study", "Islamyat", "Computer"]
//       },
//       {
//           "id": 6,
//           "tid": "teacher7",
//           "subject": ["English", "Urdu", "Math", "General Knowledge", "Social Study", "Islamyat", "Computer"]
//       },
//       {
//           "id": 7,
//           "tid": "teacher8",
//           "subject": ["English", "Urdu", "Math", "General Knowledge", "Social Study", "Islamyat", "Computer", "Quran"]
//       },
//       {
//           "id": 8,
//           "tid": "teacher9",
//           "subject": ["English", "Urdu", "Math", "General Knowledge", "Social Study", "Islamyat", "Computer", "Quran"]
//       }
//   ];

const populateStudents = async () => {
    const studentCollection = firestore.collection('Student');

    for (const student of studentData) {
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

    for (const item of classes) {
        try {
            const docRef = await classCollection.add({
                tid: item.tid,
                subject: item.subject
            });
            console.log(`${docRef.id} (tid: ${item.tid}) added!`);
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
