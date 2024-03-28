# Patient Management Application

A simple application for managing patients in a medical clinic.

## Functional requirements

The application allows:
* Add a patient
* Edit patient
* Delete patient
* List patients
* Sorting patient list

## Technologies used
* JavaScript
* React
* MySQL

## How to run:
1. Make sure you have Node.js and MySQL installed on your computer.
2. Clone this project to your computer.
3. Import database "clinic" using [clinic_patients.sql](https://github.com/zolszowka/Patient_Management_Application/blob/master/database/clinic_patients.sql).
4. Create a user using the credentials from the [database_login_data.txt](https://github.com/zolszowka/Patient_Management_Application/blob/master/database/database_login_data.txt) file and grant appropriate permissions.
5. Open a terminal in the project's main directory.
6. Go to server directory.
* Install dependencies.
```
npm install
```
* Start the server.
```
npm start
```
7. Go to client directory.
* Install dependencies.
```
npm install
```
* Start application.
```
npm start
```
The client application should be accessible in the web browser at http://localhost:3000.

## Preview
After clicking the "Add Patient" button, you will be redirected to a page where you can input the details of the patient to be added to the database.

![Alt text](https://github.com/zolszowka/Patient_Management_Application/blob/master/readme/AddPatient.JPG)

After clicking the "Patient List" button, you will see a list of all patients currently stored in the database. At this point, you can delete patients or edit their data.

![Alt text](https://github.com/zolszowka/Patient_Management_Application/blob/master/readme/PatientList.JPG)

After clicking the "Edit" button, you'll be redirected to a page where you can edit patient data. If the data is entered correctly, such as having the appropriate number of characters for PESEL and ZIP code and ensuring the PESEL is unique, clicking the "Submit" button will update the data.

![Alt text](https://github.com/zolszowka/Patient_Management_Application/blob/master/readme/EditPatient.JPG)

On the Patient List page, you can sort patients alphabetically by last name or by ID number.

![Alt text](https://github.com/zolszowka/Patient_Management_Application/blob/master/readme/PatientListSorted.JPG)
