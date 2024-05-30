
import firestore from '@react-native-firebase/firestore';

const getAllClasses = async () => {
    try {
        console.log("Idr ha");
        const classCollection = await firestore().collection('Class').get();
        const classes = [];
        classCollection.forEach(doc => {
            classes.push({
                id: doc.id,
                data: doc.data()
            });
        });
        console.log("Classes fetched: ", classes);
        return classes;
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};


const updateClassTeacher = async (classId, teacherName) => {
    try {
        // Reference to the class document
        const classRef = firestore().collection('Class').doc(classId);

        // Fetch the current teacher document if the teacherName is not 'None'
        if (teacherName !== 'None') {
            const teacherQuerySnapshot = await firestore().collection('Teacher').where('name', '==', teacherName).get();
            
            if (!teacherQuerySnapshot.empty) {
                // Assuming there is only one teacher with the given name
                const teacherDoc = teacherQuerySnapshot.docs[0];
                const teacherRef = teacherDoc.ref;

                // Update the new teacher's assigned status to '1'
                await teacherRef.update({ assigned: '1' });

                // Update the class document with the new teacher's ID
                await classRef.update({ tid: teacherRef.id });

                console.log(`Teacher updated successfully for class ${classId}`);
                console.log("Teacher Name: ", teacherName);
            } else {
                console.error('No teacher found with the given name:', teacherName);
            }
        } else {
            // If teacherName is 'None', unassign the current teacher and update the class document
            await classRef.update({ tid: '' });
            console.log(`Class teacher unassigned successfully for class ${classId}`);
        }

    } catch (error) {
        console.error('Error updating class teacher:', error);
    }
};




export { getAllClasses, updateClassTeacher };