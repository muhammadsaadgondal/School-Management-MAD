const { faker } = require('@faker-js/faker');

function createRandomStudent() {
    return {
        regNo: '0'+Math.floor(Math.random() * (25 - 1 + 1)) + 1,
        name: faker.name.fullName(),
        DoA: faker.date.past(), // Random date in the past for admission
        DoB: faker.date.birthdate({ min:1 ,max: 18 }), // Random birthdate under 18
        gender: faker.helpers.arrayElement(['male', 'female']),
        father: {
            name: faker.name.fullName(),
            occupation: faker.name.jobTitle(),
            caste: faker.address.country(),
            residency: faker.address.streetAddress(),
        },
        loginCred: {
            regNo: '0'+Math.floor(Math.random() * (25 - 1 + 1)) + 1,
            password: faker.internet.password(),
        },
        remarks: [], // Replace with logic to generate remarks (if needed)
        fee: [],     // Replace with logic to generate fee data (if needed)
        session: [
            {
                year: faker.date.future({ years: 1 }).getFullYear().toString(), // Upcoming year
                class: "objectId", // Replace with actual object ID generation
                subjects: ["objectId1", "objectId2"], // Replace with actual object IDs
                status: faker.helpers.arrayElement(["pass", "fail", "ongoing"]),
            },
        ],
    };
}


 
module.exports = createRandomStudent;
