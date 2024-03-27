import React, {useEffect, useState} from "react";
import './AddPatient.css';


const AddPatient = () => {
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
    }, []);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

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
            const addRequest = objectStore.add(formData);

            addRequest.onsuccess = function (event) {
                console.log('Patient added successfully');
                alert('Patient added successfully.');
                setFormData({
                    firstname: '',
                    lastname: '',
                    pesel: '',
                    street: '',
                    city: '',
                    zipcode: ''
                });
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
        <div className="AddPatient">
            <div className="AddPatient-form">
                <div className="AddPatient-row">
                    <label className="AddPatient-label">First Name:
                        <input
                            type="text"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="AddPatient-row">
                    <label className="AddPatient-label">Last Name:
                        <input
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="AddPatient-row">
                    <label className="AddPatient-label">PESEL:
                        <input
                            type="text"
                            name="pesel"
                            value={formData.pesel}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="AddPatient-row">
                    <label className="AddPatient-label">Street:
                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="AddPatient-row">
                    <label className="AddPatient-label">City:
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="AddPatient-row">
                    <label className="AddPatient-label">ZIP code:
                        <input
                            type="text"
                            name="zipcode"
                            value={formData.zipcode}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="Buttons"></div>
                <button onClick={handleSubmit}>Add Patient</button>
            </div>
        </div>
    );
}

export default AddPatient;
