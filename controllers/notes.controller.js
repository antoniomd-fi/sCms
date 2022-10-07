const Notes = require('../models/notes.js');
const Student = require('../models/students.js');
const Course = require('../models/courses.js');

// Create and Save a new Note
async function create(req, res) {
    // Validate request
    if (!req.body.score) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Note
    const note = {
        score: req.body.score,
        studentId: req.body.studentId,
        courseId: req.body.courseId
    };

    // Save Note in the database
    try {
        const data = await Notes.create(note);
        res.send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Note."
        });
    }
}

// get Students note
async function getStudentNotes(req,res) {
    const {id} = req.params;
    const student = await Student.findByPk(id);
    if (student) {
        const notes = await Notes.findAll({
            where: {
                studentId: id
            }
        });
        res.send(notes);
    }
}


// Find a single Note with an idStudent
async function findOne(req, res) {
    const id = req.params.id;
    try {
        const data = await Notes.findAll({
            where: {
                studentId: id
            },
            include: [
                {
                    model: Student,
                    attributes: ['name']
                },
                {
                    model: Course,
                    attributes: ['name']
                }
            ]
        });
        if (data) {
            res.send(data);
        }else {
            res.status(404).send({
                message: "Note not found"
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving notes."
        });
    }
}

// Delete a Note with the specified id in the request
async function deleteOne(req, res) {
    const id = req.params.id;

    try {
        const data = await Notes.destroy({
            where: { id: id }
        });
        if (data == 1) {
            res.send({
                message: "Note was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Note with id=${id}. Maybe Note was not found!`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while deleting the Note."
        });
    }
}

module.exports = {
    create,
    findOne,
    deleteOne,
    getStudentNotes
}