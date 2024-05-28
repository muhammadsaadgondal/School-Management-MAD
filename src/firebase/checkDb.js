
const admin = require('firebase-admin');

const serviceAccount = require('./school-management-system-3b44a-firebase-adminsdk-gi2vb-1e81d4008a.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const firestore = admin.firestore();

const getAllClasses = async () => {
    try {
        const classesCollection = await firestore.collection('Student').get();
        
        const classes = [];
        classesCollection.forEach(doc => {
            classes.push({
                id: doc.id,
                data: doc.data()
            });
        });

        return classes;
    } catch (error) {
        throw new Error("Error occurred while retrieving classes:", error);
    }
}

// Example usage
getAllClasses()
    .then(classes => {
        console.log("All Students:", classes);
    })
    .catch(error => {
        console.error("Error:", error);
    });