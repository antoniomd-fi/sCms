const Course = require('../models/courses.js');

// Create and Save a new Course async
async function create(req, res) {
    // Validate request
    if (!req.body.name) {
        res.status(400).json({
            message: "Content can not be empty!"
        });
        return;
    }

    // Save Course in the database only if it doesn't exist
    try {
        const course = await Course.findOne({
            where: {
                name: req.body.name
            }
        });
        if (course) {
            res.status(400).json({
                message: "Course already exists!"
            });
            return;
        }
        const data = await Course.create({
            name: req.body.name
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while creating the Course."
        });
    }
}

// Retrieve all Courses from the database.
async function findAll(req, res) {
    try {
        const data = await Course.findAll();
        if (data.length > 0) {
            res.json(data);
        }else {
            res.status(404).json({
                message: "No Courses found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving courses."
        });
    }
}

// Find a single Course with an id
async function findOne(req, res) {
    const id = req.params.idCourse;
    try {
        const data = await Course.findByPk(id);
        if (data) {
            res.json(data);
        }else {
            res.status(404).json({
                message: "Course not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving course."
        });
    }
}

// Update a Course by the id in the request
async function update(req, res) {
    const id = req.params.idCourse;
    try {
        const data = await Course.update(req.body, {
            where: { id: id }
        });
        if (data == 1) {
            res.json({
                message: "Course was updated successfully."
            });
        }else {
            res.status(404).json({
                message: `Cannot update Course with id=${id}. Maybe Course was not found or req.body is empty!`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while updating the Course."
        });
    }
}

// Delete a Course with the specified id in the request
async function deleteOne(req, res) {
    const id = req.params.idCourse;
    try {
        const data = await Course.destroy({
            where: { id: id }
        });
        if (data === 1) {
            res.json({
                message: "Course was deleted successfully!"
            });
        }else {
            res.status(404).json({
                message: `Cannot delete Course with id=${id}. Maybe Course was not found!`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while deleting the Course."
        });
    }
}

module.exports = {
    create,
    findAll,
    findOne,
    update,
    deleteOne
};