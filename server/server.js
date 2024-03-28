const mysql = require('mysql2');
const express = require('express');
const cors = require('cors')

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "password",
    database: "clinic"
});

con.connect(function (err) {
    if (err) {
        console.log(err);
    }
    console.log("Connected!");
});

// Get patient list
app.get("/patientlist", (req, res) => {
    con.query("SELECT * FROM patients", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.send(result);
    });
});

// Add patient to database
app.post("/add", (req, res) => {
    const {firstname, lastname, pesel, street, city, zipcode} = req.body;
    con.query("INSERT INTO patients (firstname, lastname, pesel, street, city, zipcode) VALUES (?, ?, ?, ?, ?, ?)", [firstname, lastname, pesel, street, city, zipcode], (error, results) => {
        if (error) {
            console.error('Error adding patient:', error);
            res.status(500).json({error: 'Internal server error'});
        } else {
            console.log('Patient added successfully');
            res.status(201).json({message: 'Patient added successfully'});
        }
    });
});

// Check if pesel exists in database
app.get("/checkpesel/:pesel", (req, res) => {
    const pesel = req.params.pesel;
    con.query("SELECT * FROM patients WHERE pesel = ?", pesel, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            const exists = result.length > 0;
            res.json({exists: exists});
        }
    });
});

// Check if pesel exists in database, excluding the patient with the given id
app.get("/checkpesel/:id/:pesel", (req, res) => {
    const id = req.params.id;
    const pesel = req.params.pesel;
    con.query("SELECT * FROM patients WHERE id != ? AND pesel = ?", [id, pesel], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            const exists = result.length > 0;
            res.json({exists: exists});
        }
    });
});

// Delete patient from database
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    con.query("DELETE FROM patients WHERE id = ?", id, (error, results) => {
        if (error) {
            console.error('Error deleting patient:', error);
            res.status(500).json({error: 'Internal server error'});
        } else {
            console.log('Patient deleted successfully');
            res.status(200).json({message: 'Patient deleted successfully'});
        }
    });
});

// Get patient by id
app.get("/patient/:id", (req, res) => {
    const id = req.params.id;
    con.query("SELECT * FROM patients WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.send(result);
    });
});

// Update patient
app.put("/edit/:id", (req, res) => {
    const id = req.params.id;
    const {firstname, lastname, pesel, street, city, zipcode} = req.body;
    con.query("UPDATE patients SET firstname = ?, lastname = ?, pesel = ?, street = ?, city = ?, zipcode = ? WHERE id = ?", [firstname, lastname, pesel, street, city, zipcode, id], (error, results) => {
        if (error) {
            console.error('Error updating patient:', error);
            res.status(500).json({error: 'Internal server error'});
        } else {
            console.log('Patient updated successfully');
            res.status(200).json({message: 'Patient updated successfully'});
        }
    });
})


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});