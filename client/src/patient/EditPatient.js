import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import './EditPatient.css';
import axios from "axios";

const EditPatient = () => {
    const {patientId} = useParams();
    const [formData, setFormData] = useState({
        id: '',
        firstname: '',
        lastname: '',
        pesel: '',
        street: '',
        city: '',
        zipcode: ''
    });


    useEffect(() => {
        axios.get(`http://localhost:5000/patient/${patientId}`)
            .then((response) => {
                setFormData(response.data[0])
            })
            .catch((error) => {
                console.error('Error fetching patient data:', error);
            });
    }, [patientId]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = () => {
        if (formData.zipcode.length !== 6) {
            alert("ZIP code must have 6 characters.");
            return;
        }
        if (!formData.pesel) {
            alert("Please enter the PESEL.");
            return;
        }

        if (formData.pesel.length !== 11) {
            alert("PESEL must have 11 digits.");
            return;
        }

        axios.get(`http://localhost:5000/checkpesel/${formData.id}/${formData.pesel}`)
            .then((response) => {
                if (response.data.exists) {
                    alert("This PESEL already exists in the database.");
                } else {
                    axios.put(`http://localhost:5000/edit/${patientId}`, formData)
                        .then((response) => {
                            console.log("Patient updated successfully");
                            alert('Patient updated successfully.');
                            setFormData({
                                id: '',
                                firstname: '',
                                lastname: '',
                                pesel: '',
                                street: '',
                                city: '',
                                zipcode: ''
                            })
                        })
                        .catch((error) => {
                            console.error('Error updating patient:', error);
                            alert('Error updating patient. Please try again.');
                        });
                }
            })
            .catch((error) => {
                console.error('Error checking PESEL uniqueness:', error);
            });
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