// controller
const Student = require('../models/students.js');

// Create and Save a new Student async
async function create(req, res) {
    // Validate request
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.group) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Student
    const student = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        group: req.body.group
    };

    // Save Student in the database
    try {
        const data = await Student.create(student);
        res.send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Student."
        });
    }
}

module.exports = {
    create
}