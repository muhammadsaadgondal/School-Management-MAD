const {firestore} = require('../firebase/firestore');
const db = firestore;

const subjects = {
    "0": ['English', 'Urdu', 'Mathematics', 'Nazra-e-Quran'],
    "1": ['English', 'Urdu', 'Mathematics', 'Nazra-e-Quran', 'General Knowledge'],
    "2": ['English', 'Urdu', 'Mathematics', 'General Knowledge', 'Islamiat'],
    "3": ['English', 'Urdu', 'Mathematics', 'General Knowledge', 'Islamiat', 'Social Studies'],
    "4": ['English', 'Urdu', 'Mathematics', 'General Knowledge', 'Islamiat', 'Social Studies'],
    "5": ['English', 'Urdu', 'Mathematics', 'General Knowledge', 'Islamiat', 'Social Studies', 'Computer Science 1', 'Computer Science 2'],
    "6": ['English', 'Urdu', 'Mathematics', 'General Knowledge', 'Islamiat', 'Social Studies', 'Computer Science 1', 'Computer Science 2'],
    "7": ['English', 'Urdu', 'Mathematics', 'General Knowledge', 'Islamiat', 'Social Studies', 'Computer Science 1', 'Computer Science 2', 'Quran'],
    "8": ['English', 'Urdu', 'Mathematics', 'General Knowledge', 'Islamiat', 'Social Studies', 'Computer Science 1', 'Computer Science 2', 'Quran'],
    "9": ['English', 'Urdu', 'Mathematics', 'General Knowledge', 'Islamiat', 'Social Studies', 'Computer Science 1', 'Computer Science 2', 'Quran'],
};

const createClass = () => {
    const classes = [];
    for (const property in subjects) {
        if (subjects.hasOwnProperty(property)) {
            classes.push({
                id: property,
                subjects: subjects[property],
                tid: `t${1 + parseInt(property)}`,
            });
        }
    }
    return classes;
};

const storeClasses = async () => {
    const classes = createClass();
    const batch = db.batch();
    classes.forEach((classObj) => {
        const classRef = db.collection('Class').doc(classObj.id);
        batch.set(classRef, classObj);
    });
    await batch.commit();
    console.log('Classes stored successfully!');
};

const getAllClasses = async () => {
    const classes = [];
    const classRef = db.collection('Class');
    const snapshot = await classRef.get();
    snapshot.forEach(doc => {
        classes.push(doc.data());
    });
    return classes;
};

const getClass = async (id) => {
    const classRef = db.collection('Class').doc(id);
    const doc = await classRef.get();
    if (!doc.exists) {
        console.log('No such document!');
        return null;
    } else {
        return doc.data();
    }
}

module.exports = { getAllClasses, getClass };