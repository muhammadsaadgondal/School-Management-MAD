const admin = require('firebase-admin');

const serviceAccount = require('./school-management-system-3b44a-firebase-adminsdk-gi2vb-1e81d4008a.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

async function deleteCollection(collectionName, batchSize = 100) {
    const collectionRef = firestore.collection(collectionName);
    const query = collectionRef.limit(batchSize);

    return new Promise((resolve, reject) => {
        deleteQueryBatch(query, resolve).catch(reject);
    });
}

async function deleteQueryBatch(query, resolve) {
    const snapshot = await query.get();

    if (snapshot.size === 0) {
        // When there are no documents left, we can resolve the Promise
        resolve();
        return;
    }

    // Create a new batch to delete
    const batch = firestore.batch();
    snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
    });

    await batch.commit();

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
        deleteQueryBatch(query, resolve);
    });
}

// Usage example
deleteCollection('Student')
    .then(() => {
        console.log('Collection deleted successfully.');
    })
    .catch(error => {
        console.error('Error deleting collection:', error);
    });