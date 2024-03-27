import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import './EditPatient.css';

const EditPatient = () => {
    const { patientId } = useParams();
    const [patients, setPatients] = useState([]);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        pesel: '',
        street: '',
        city: '',
        zipcode: ''
    });

    useEffect(() => {
        const openRequest = indexedDB.open('PatientsDB', 1);

        openRequest.onsuccess = function (event) {
            const database = event.target.result;
            const transaction = database.transaction(['patients'], 'readonly')
            const objectStore = transaction.objectStore('patients');
            console.log("Patient ID:", patientId);
            const request = objectStore.get(parseInt(patientId));

            request.onsuccess = function (event) {
                const patientData = event.target.result;
                if (patientData) {
                    setFormData(patientData);
                }
            };

            request.onerror = function (event) {
                console.log('Error getting patient data from database')
            };

            const allPatientsRequest = objectStore.getAll();
            allPatientsRequest.onsuccess = function (event) {
                setPatients(event.target.result);
            };

            allPatientsRequest.onerror = function (event) {
                console.log('Error getting patients from database')
            };
        };
        openRequest.onerror = function (event) {
            console.log('Error opening database');
        };
    }, [patientId]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };


    const navigate = useNavigate();
    const handleSubmit = () => {
        if (!formData.pesel) {
            alert("Please enter the PESEL.");
            return;
        }

        if (formData.pesel.length !== 11) {
            alert("PESEL must have 11 digits.");
            return;
        }

        const isPeselUnique = patients.every(patient => patient.pesel !== formData.pesel);
        if (!isPeselUnique) {
            alert("This PESEL already exists in the database.");
            return;
        }
        const openRequest = indexedDB.open('PatientsDB', 1);

        openRequest.onsuccess = function (event) {
            const database = event.target.result;
            const transaction = database.transaction(['patients'], 'readwrite');
            const objectStore = transaction.objectStore('patients');
            const addRequest = objectStore.put(formData);

            addRequest.onsuccess = function (event) {
                console.log('Patient updated successfully');
                alert('Patient updated successfully.');
                navigate("/patientlist");
            };

            addRequest.onerror = function (event) {
                console.log('Error adding patient');
            };
        };

        openRequest.onerror = function (event) {
            console.log('Error opening database');
        };
    };

    return (
        <div className="EditPatient">
            <div className="EditPatient-form">
                <div className="EditPatient-row">
                    <label className="EditPatient-label">First Name:
                        <input
                            type="text"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="EditPatient-row">
                    <label className="EditPatient-label">Last Name:
                        <input
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="EditPatient-row">
                    <label className="EditPatient-label">PESEL:
                        <input
                            type="text"
                            name="pesel"
                            value={formData.pesel}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="EditPatient-row">
                    <label className="EditPatient-label">Street:
                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="EditPatient-row">
                    <label className="EditPatient-label">City:
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="EditPatient-row">
                    <label className="EditPatient-label">ZIP code:
                        <input
                            type="text"
                            name="zipcode"
                            value={formData.zipcode}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="Buttons">
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default EditPatient;