// controller
const Student = require('../models/students.js');

// Create and Save a new Student async
async function create(req, res) {
    // Validate request
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.group) {
        res.status(400).json({
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
        res.json(data);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while creating the Student."
        });
    }
}

// Retrieve all Students from the database.
async function findAll(req, res) {
    try {
        const data = await Student.findAll();
        if (data.length > 0) {
            res.send(data);
        }else {
            res.status(404).json({
                message: "No Students found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving students."
        });
    }
}

// Find a single Student with an id
async function findOne(req, res) {
    const id = req.params.id;
    try {
        const data = await Student.findByPk(id);
        if (data) {
            res.json(data);
        }else {
            res.status(404).json({
                message: "Student not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving students."
        });
    }
}

// Update a Student by the id in the request
async function update(req, res) {
    const id = req.params.id;
    try {
        const data = await Student.update(req.body, {
            where: { id: id }
        });
        if (data === 1) {
            res.json({
                message: "Student was updated successfully."
            });
        }else {
            res.status(404).json({
                message: "Student not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while updating the Student."
        });
    }
}

// Delete a Student with the specified id in the request
async function deleteOne(req, res) {
    const id = req.params.id;
    try {
        const data = await Student.destroy({
            where: { id: id }
        });
        if (data == 1) {
            res.json({
                message: "Student was deleted successfully!"
            });
        }else {
            res.status(404).json({
                message: "Student not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while deleting the Student."
        });
    }
}

module.exports = {
    create,
    findAll,
    findOne,
    update,
    deleteOne
}