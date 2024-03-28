import React, {useState} from "react";
import './AddPatient.css';
import axios from 'axios';


const AddPatient = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        pesel: '',
        street: '',
        city: '',
        zipcode: ''
    });

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
        axios.get(`http://localhost:5000/checkpesel/${formData.pesel}`)
            .then((response) => {
                if (response.data.exists) {
                    alert("This PESEL already exists in the database.");
                } else {
                    axios.post("http://localhost:5000/add", formData)
                        .then((response) => {
                            console.log("Patient added successfully:", response.data);
                            alert('Patient added successfully.');
                            setFormData({
                                firstname: '',
                                lastname: '',
                                pesel: '',
                                street: '',
                                city: '',
                                zipcode: ''
                            });
                        })
                        .catch((error) => {
                            console.error('Error adding patient:', error);
                            alert('Error adding patient. Please try again.')
                        });
                }
            })
            .catch((error) => {
                console.error('Error checking PESEL uniqueness:', error);
            });

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
