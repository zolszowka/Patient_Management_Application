import React, {useEffect, useState} from "react";
import './PatientList.css';

const PatientList = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const openRequest = indexedDB.open('PatientsDB', 1);

        openRequest.onsuccess = function (event) {
            const database = event.target.result;
            const transaction = database.transaction(['patients'], 'readonly')
            const objectStore = transaction.objectStore('patients');
            const request = objectStore.getAll();

            request.onsuccess = function (event) {
                setPatients(event.target.result);
            };

            request.onerror = function (event) {
                console.log('Error getting patients from database')
            };

        };
        openRequest.onerror = function (event) {
            console.log('Error openning database');
        };
    }, []);

    const handleDeletePatient = (patientId) => {
        const openRequest = indexedDB.open('PatientsDB', 1);
        openRequest.onsuccess = function (event) {
            const database = event.target.result;
            const transaction = database.transaction(['patients'], 'readwrite')
            const objectStore = transaction.objectStore('patients');

            const deleteRequest = objectStore.delete(patientId);

            deleteRequest.onsuccess = function (event) {
                console.log('Patient deleted successfully');
                const updatedPatients = patients.filter(patient => patient.id !== patientId);
                setPatients(updatedPatients);
                alert('Patient deleted successfully')
            };

            deleteRequest.onerror = function (event) {
                console.log('Error deleting patient')
            };

        };
        openRequest.onerror = function (event) {
            console.log('Error openning database');
        };

    }

    return (
        <div className="PatientList-container">
            <div className="PatientList-title">All Patients</div>
            <div>
                {patients.map(patient => (
                    <div className="PatientList-patient" key={patient.id}>
                        <div className="PatientList-patient-data">
                            <p>First Name: {patient.firstname}</p>
                            <p>Last Name: {patient.lastname}</p>
                            <p>Pesel: {patient.pesel}</p>
                            <p>Street: {patient.street}</p>
                            <p>City: {patient.city}</p>
                            <p>ZIP code: {patient.zipcode}</p>
                        </div>
                        <div className="PatientList-buttons">
                            <button onClick={() => handleDeletePatient(patient.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PatientList;