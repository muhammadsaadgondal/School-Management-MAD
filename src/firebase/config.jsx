import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAUgzUL_Rcj0jKCefqH27dnskgPxS7FYa0',
  // authDomain: 'student-portal-75a20.firebaseapp.com',
  databaseURL: 'https://student-portal-75a20-default-rtdb.firebaseio.com',
  projectId: 'student-portal-75a20',
  storageBucket: 'student-portal-75a20.appspot.com',
  appId: '1:325703529831:android:c8ab6d5def058fd434ebc2',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };