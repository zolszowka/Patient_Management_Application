import React, {useEffect, useState} from "react";
import './EditPatient.css';


const EditPatient = ({ patientId }) => {
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
            const request = objectStore.get(patientId);

            request.onsuccess = function (event) {
                const patientData = event.target.result;
                if (patientData) {
                    setFormData(patientData);
                }
            };

            request.onerror = function (event) {
                console.log('Error getting patients from database')
            };

        };
        openRequest.onerror = function (event) {
            console.log('Error openning database');
        };
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = () => {
        const openRequest = indexedDB.open('PatientsDB', 1);

        openRequest.onsuccess = function (event) {
            const database = event.target.result;
            const transaction = database.transaction(['patients'], 'readwrite');
            const objectStore = transaction.objectStore('patients');
            const addRequest = objectStore.add(formData);

            addRequest.onsuccess = function (event) {
                console.log('Patient added successfully');
                alert('Patient added successfully');
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
                    <label className="EditPatient-label">Pesel:
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
                <div className="Buttons"></div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default EditPatient;