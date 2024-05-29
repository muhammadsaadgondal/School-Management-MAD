
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

export { getAllClasses };