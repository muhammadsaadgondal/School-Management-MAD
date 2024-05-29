const { faker } = require('@faker-js/faker');


function guessCasteByRegion() {
    // Define an array of predefined castes
    const castes = ['Jutt', 'Arain', 'Rajput', 'Gujjar', 'Malik', 'Sheikh', 'Soomro', 'Laghari', 'Memon', 'Chandio', 'Khan', 'Yousafzai', 'Khattak', 'Mughal', 'Afridi', 'Tareen', 'Bugti', 'Mengal', 'Raisani', 'Khetran', 'Marri', 'Balti', 'Shina', 'Yashkun', 'Brusho', 'Wakhi'];

    const randomCaste = castes[Math.floor(Math.random() * castes.length)];

    return randomCaste;
}

function createRandomStudent(grade, index) {
    return {
        regNo: index < 10 ? grade + '' + index : grade + '0' + index,
        name: faker.person.fullName(),
        DoA: faker.date.past().toISOString(),
        DoB: faker.date.birthdate({ min: 4, max: 15 }).toISOString(),
        gender: faker.person.sexType(),
        father: {
            name: faker.person.fullName(),
            occupation: faker.name.jobTitle(),
            caste: guessCasteByRegion(),
            residency: faker.address.streetAddress(),
        },
        loginCred: {
            regNo: grade + '' + index,
            password: grade + '' + index,
        },
        remarks: [], // Replace with logic to generate remarks (if needed)
        fee: [],     // Replace with logic to generate fee data (if needed)
        session: [],
    };
}



module.exports = createRandomStudent;
