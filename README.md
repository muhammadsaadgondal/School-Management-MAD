# School Management System

A React Native CLI and Firebase project designed to manage school operations efficiently. This system includes three types of users: Admin, Teacher, and Student, each with specific roles and responsibilities.

## Features

### Admin
- **Assign/Remove Classes:** Assign or remove a class for a particular teacher.
- **Manage Student Accounts:** Create new student accounts or modify existing student records, including fee status.
- **Assign Timetables:** Set timetables for classes.
- **Generate Reports:** Generate reports for teachers and students.
- **Announcements:** Make announcements.

### Teacher
- **Manage Marks:** View, search, insert, update, and delete student marks.
- **Class Management:** Make changes to their assigned classes.

### Student
- **View Marks:** View marks for current year subjects or previous records.
- **View Fee Status and Timetable:** Access fee status, timetable, and syllabus for their classes.

## Project Configuration
- **Primary Color:** Indigo 700
- **UI Framework:** React native paper and Tailwind React Native Classnames
- **Design Style:** Components with round border radius, minimalistic design

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/school-management-mad.git
    ```
2. Navigate to the project directory:
    ```bash
    cd school-management-mad
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up Firebase:
   - Create a Firebase project in the Firebase Console.
   - Add a web app to the project.
   - Copy the Firebase configuration object and replace it in the project.
   - Enable the necessary Firebase services (Authentication, Firestore, etc.).

5. Run the project:
    ```bash
    npx react-native run-android
    # or for iOS
    npx react-native run-ios
    ```

## Usage

### Admin
1. **Assign/Remove Classes:**
   - Navigate to the "Manage Classes" section.
   - Select a teacher and assign or remove a class.

2. **Manage Student Accounts:**
   - Go to the "Student Management" section.
   - Create a new student account or modify existing records.

3. **Assign Timetables:**
   - Visit the "Timetable" section.
   - Assign timetables for various classes.

4. **Generate Reports:**
   - Access the "Reports" section.
   - Generate and view reports for teachers and students.

5. **Make Announcements:**
   - Use the "Announcements" section to make school-wide announcements.

### Teacher
1. **Manage Marks:**
   - Go to the "Marks Management" section.
   - View, search, insert, update, or delete student marks.

2. **Class Management:**
   - Navigate to the "Class Management" section.
   - Perform changes to assigned classes.

### Student
1. **View Marks:**
   - Access the "Marks" section to view current year or previous records.

2. **View Fee Status and Timetable:**
   - Go to the "Fee Status" section to check fee details.
   - Visit the "Timetable" section to view class schedules and syllabus.

### Databse Schema
student:{
	regNo: number(1-1000),
	name: string,
	DoA: Date,
	DoB: Date,
	gender: binary,
	father: {
		name: string,
		occupation: string,
		caste: string,
		residency: string
	},
	loginCred:{
		regNo: string,
		password: string
	},
	remarks: [{ objectID }],
	fee:[{ objectID }],
	session:[{
		year: string,
		class: objectID,
		subjects: [{
			name: string,
			firstTerm: number(max 50),
			midTerm: number(max 50),
			finalTerm: number(max 100)
		}],
		status: string, #[pass, fail, ongoing]
	}]
},

remarks:{
	id:	objectID,
	date: date,
	comment: string
},

fee:{
	id: objectID,
	datePosted: date,
	dueDate: date,
	submissionDate: date,
	totalDues: number,
	paidAmount: number,
	`payableAmount: number`,
	status: binary,
	comment: string
},

teacher:{
	tid: string, #CNIC no
	name: string,
	gender: binary,
	loginCred:{
		email: string,
		password: string,
	},
	DoB: date,
	DoJ: date,
	pay: number,
	assigned: binary
}


class:{					Done
	id: number, #0,1,...,9
	tid: objectID,
	subject:[string],
	schedule: Image,
	syllabus: Image
},



Notification:{
	classId:String,
	datePosted:String,
	message:String,
	title:String,
	visibleTill:String
}student:{
	regNo: number(1-1000),
	name: string,
	DoA: Date,
	DoB: Date,
	gender: binary,
	father: {
		name: string,
		occupation: string,
		caste: string,
		residency: string
	},
	loginCred:{
		regNo: string,
		password: string
	},
	remarks: [{ objectID }],
	fee:[{ objectID }],
	session:[{
		year: string,
		class: objectID,
		subjects: [{
			name: string,
			firstTerm: number(max 50),
			midTerm: number(max 50),
			finalTerm: number(max 100)
		}],
		status: string, #[pass, fail, ongoing]
	}]
},

remarks:{
	id:	objectID,
	date: date,
	comment: string
},

fee:{
	id: objectID,
	datePosted: date,
	dueDate: date,
	submissionDate: date,
	totalDues: number,
	paidAmount: number,
	`payableAmount: number`,
	status: binary,
	comment: string
},

teacher:{
	tid: string, #CNIC no
	name: string,
	gender: binary,
	loginCred:{
		email: string,
		password: string,
	},
	DoB: date,
	DoJ: date,
	pay: number,
	assigned: binary
}


class:{					Done
	id: number, #0,1,...,9
	tid: objectID,
	subject:[string],
	schedule: Image,
	syllabus: Image
},



Notification:{
	classId:String,
	datePosted:String,
	message:String,
	title:String,
	visibleTill:String
}


