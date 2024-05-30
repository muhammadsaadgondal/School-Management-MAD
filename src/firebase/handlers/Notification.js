import firestore from '@react-native-firebase/firestore';

const getClassesNotifications = async () => {
    const notifications = [];
    const notificationRef = firestore().collection('Notification');
    const snapshot = await notificationRef.get();
    snapshot.forEach(doc => {
        notifications.push(doc.data());
    });
    return notifications;

};

const writeNotification = async (title, message, classId, visibleTill) => {
    try {
        const notification = {
            title: title,
            message: message,
            classId: classId,
            visibleTill: visibleTill,
            datePosted: new Date().toLocaleDateString()
        };

        const notificationRef = firestore().collection('Notification').doc();
        await notificationRef.set(notification);
        console.log('Notification added successfully!');
    } catch (error) {
        console.error('Error adding notification:', error);
    }
};

const deleteNotification = async (notification) => {
    try {
        const { classId, datePosted, message, title, visibleTill } = notification;

        // Query the Firestore collection for notifications matching the given fields
        const querySnapshot = await firestore().collection('Notification')
            .where('classId', '==', classId)
            .where('datePosted', '==', datePosted)
            .where('message', '==', message)
            .where('title', '==', title)
            .where('visibleTill', '==', visibleTill)
            .get();

        // Delete each matching notification
        querySnapshot.forEach(async (doc) => {
            await doc.ref.delete();
        });

        console.log('Notification is deleted successfully');
    } catch (error) {
        console.error('Error deleting notification:', error);
    }
}


const updateNotification = async (title, message, datePosted, classId) => {
    try {
        // Query for the notification with matching classId, title, and message
        const notificationRef = firestore().collection('Notification')
            .where('classId', '==', classId)
            .where('datePosted', '==', datePosted);

        const snapshot = await notificationRef.get();

        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }

        // Update each matching document
        snapshot.forEach(async (doc) => {
            await doc.ref.update({
                title: title,
                message: message,
                classId: classId,
            });
        });

        console.log('Notification updated successfully');
    }
    catch (error) {
        console.error('Error updating notification:', error);
    }
};



const getSchoolNotificaitons = async () => {
    const notifications = [];
    try {
        const notificationRef = firestore().collection('Notification')
            .where('classId', '!=', '0')
            .orderBy('date', 'desc');

        const snapshot = await notificationRef.get();
        const currentDate = new Date();

        snapshot.forEach(doc => {
            const data = doc.data();
            const visibleTillDate = new Date(data.visibleTill);

            // Only add notifications that are still valid
            if (visibleTillDate > currentDate) {
                notifications.push(data);
            }
        });
    } catch (error) {
        console.error("Error fetching notifications: ", error);
    }
    return notifications;
}

export { getClassesNotifications, writeNotification, getSchoolNotificaitons, updateNotification, deleteNotification };
