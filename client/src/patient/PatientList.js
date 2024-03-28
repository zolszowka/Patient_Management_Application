import React, {useEffect, useState} from "react";
import './PatientList.css';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

const PatientList = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/patientlist").then((data)=>{
            console.log(data)
            setPatients(data.data)
        });
    }, []);

    const handleDeletePatientButtonClick = (patientId) => {
        axios.delete(`http://localhost:5000/delete/${patientId}`).then((response)=>{
            alert('Patient deleted successfully.');
            axios.get("http://localhost:5000/patientlist").then((data) => {
                setPatients(data.data);
            });
        })
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