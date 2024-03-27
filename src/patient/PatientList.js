import React, {useEffect, useState} from "react";
import './PatientList.css';
import {useNavigate} from "react-router-dom";

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
            console.log('Error opening database');
        };
    }, []);

    const handleDeletePatientButtonClick = (patientId) => {
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
                alert('Patient deleted successfully.')
            };

            deleteRequest.onerror = function (event) {
                console.log('Error deleting patient')
            };

        };
        openRequest.onerror = function (event) {
            console.log('Error opening database');
        };

    }

    const navigate = useNavigate();

    const handleEditButtonClick = (patientId) => {
        navigate(`/edit/${patientId}`);
    }

    const handleSortLastNameButtonClick = () => {
        const sortedPatients = [...patients].sort((a, b) => {
            return a.lastname.localeCompare(b.lastname);
        });
        setPatients(sortedPatients);
    }

    const handleSortIdButtonClick = () => {
        const sortedPatients = [...patients].sort((a, b) => {
            return a.id - b.id;
        });
        setPatients(sortedPatients);
    }

    return (
        <div className="PatientList-container">
            <div className="PatientList-title">All Patients</div>
            <div className="PatientList-sorting-buttons">
                <button onClick={() => handleSortLastNameButtonClick()}>Sort by Patient's Last Name</button>
                <button onClick={() => handleSortIdButtonClick()}>Sort by Patient's ID</button>
            </div>
            <div>
                {patients.map(patient => (
                    <div className="PatientList-patient" key={patient.id}>
                        <div className="PatientList-patient-data">
                            <p>ID: {patient.id}</p>
                            <p>First Name: {patient.firstname}</p>
                            <p>Last Name: {patient.lastname}</p>
                            <p>PESEL: {patient.pesel}</p>
                            <p>Street: {patient.street}</p>
                            <p>City: {patient.city}</p>
                            <p>ZIP code: {patient.zipcode}</p>
                        </div>
                        <div className="PatientList-buttons">
                            <button onClick={() => handleDeletePatientButtonClick(patient.id)}>Delete</button>
                            <button onClick={() => handleEditButtonClick(patient.id)}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PatientList;