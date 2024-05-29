const { firestore } = require('./firestore');

const getAllClasses = async () => {
    try {
        const classesCollection = await firestore.collection('Student').get();
        
        const classes = [];
        classesCollection.forEach(doc => {
            classes.push({
                id: doc.id,
                data: doc.data()
            });
        });

        return classes;
    } catch (error) {
        throw new Error("Error occurred while retrieving classes:", error);
    }
}

// Example usage
getAllClasses()
    .then(classes => {
        console.log("All Students:", classes);
    })
    .catch(error => {
        console.error("Error:", error);
    });