import './App.css';
import {Routes, Route, useNavigate} from "react-router-dom";
import AddPatient from './patient/AddPatient';
import PatientList from './patient/PatientList';
import EditPatient from './patient/EditPatient';

function App() {
    const navigate = useNavigate();

    const handleAddPatientButtonClick = () => {
        navigate("/add");
    }

    const handlePatientListButtonClick = () => {
        navigate("/patientlist");
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="App-title">Patient Management Application</div>
                <div className="App-buttons">
                    <button onClick={handleAddPatientButtonClick}>Add Patient</button>
                    <button onClick={handlePatientListButtonClick}>Patient List</button>
                </div>
            </header>
            <Routes>
                <Route path="/add" element={<AddPatient/>}/>
                <Route path="/patientlist" element={<PatientList/>}/>
                <Route path="/edit/:patientId" element={<EditPatient />} />
            </Routes>
        </div>
    );
}

export default App;
