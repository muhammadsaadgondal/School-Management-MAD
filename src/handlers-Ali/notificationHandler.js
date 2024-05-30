const {firestore} = require('../firebase/firestore');

const db = firestore;

const writeNotification = async (title, message, classId, visibleTill) => {
    const notification = notification(title, message, classId, visibleTill);
    const notificationRef = db.collection('Notification').doc();
    await notificationRef.set(notification);
    console.log('Notification added successfully!');
};

function notification(title, message, classId, visibleTill) {
    return(
        {
            title: title ? title : 'Alert',
            message: message ? message : 'This is a notification',
            classId: classId ? classId : '-1',
            visibleTill: visibleTill ? visibleTill : '',
            datePosted: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
        }
    )
};

const getNotifications = async () => {
    const notifications = [];
    const notificationRef = db.collection('Notification');
    const snapshot = await notificationRef.get();
    snapshot.forEach(doc => {
        notifications.push(doc.data());
    });
    return notifications;
};

const getClassNotifications = async (classId) => {
    const notifications = [];
    const notificationRef = db.collection('Notification').where('classId', '==', classId);
    const snapshot = await notificationRef.get();
    snapshot.forEach(doc => {
        notifications.push(doc.data());
    });
    return notifications;
};

module.exports = {writeNotification, getNotifications, getClassNotifications};