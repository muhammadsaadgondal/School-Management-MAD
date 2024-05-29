const admin = require('firebase-admin');
const serviceAccount = require('../school-management-system-3b44a-firebase-adminsdk-gi2vb-1e81d4008a.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Now you can use the admin object to interact with Firebase services
const db = admin.firestore();

module.exports = db;