const admin = require('firebase-admin');

const serviceAccount = require('./school-management-system-3b44a-firebase-adminsdk-gi2vb-1e81d4008a.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const firestore = admin.firestore();

module.exports = firestore;