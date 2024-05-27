import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('Admin');

console.log('====================================');
console.log(usersCollection);
console.log('====================================');


