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
    const student = await Student.findByPk(req.body.studentId);
    const course = await Course.findByPk(req.body.courseId);
    if (student && course) {
        // Verify if the student has already a note for the course
        const hasNoteCourse = await Notes.findOne({
            where: {
                studentId: req.body.studentId,
                courseId: req.body.courseId
            }
        });

        if (hasNoteCourse) {
            res.status(400).json({
                message: "Note already exists!"
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
            res.json(data);
        } catch (error) {
            res.status(500).json({
                message: error.message || "Some error occurred while creating the Note."
            });
        }
    } else {
        res.status(400).json({
            message: "Student or course not found!"
        });
    }
}


// Retrieve all Notes from the database.
async function findAll(req, res) {
    try {
        const data = await Notes.findAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving notes."
        });
    }
}

// get Students note
async function getStudentNotes(req, res) {
    const { idStudent } = req.params;
    const student = await Student.findByPk(idStudent);
    if (student) {
        const notes = await Notes.findAll({
            where: {
                studentId: idStudent
            }
        });
        res.json(notes);
    }else{
        res.status(400).json({
            message: "Student not found!"
        });
    }
}

// get Students courses
async function getStudentCourses(req, res) {
    const { idStudent } = req.params;
    const student = await Student.findByPk(idStudent);
    if (student) {
        const notes = await Notes.findAll({
            where: {
                studentId: idStudent
            }
        });
        const courses = [];
        for (let i = 0; i < notes.length; i++) {
            const course = await Course.findByPk(notes[i].courseId);
            courses.push(course);
        }
        res.send(courses);
    }
}

// Find a single Note with an idStudent
async function findOne(req, res) {
    const id = req.params.idNote;
    try {
        const data = await Notes.findAll({
            where: {
                studentId: id
            },
            include: [
                {
                    model: Student,
                    attributes: ['firstname', 'lastname', 'email']
                },
                {
                    model: Course,
                    attributes: ['name']
                }
            ]
        });
        if (data) {
            res.send(data);
        } else {
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
    const id = req.params.idNote;

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

//Update a sutdent's score inside Note

async function updateScore (req, res){
    const { idStudent } = req.params;
    const note = await Notes.update({
        score: req.body.score
    },
    {
        where:{studentId : idStudent}
    }
    )
    try{
        if (note) {
            res.status(200).send({
                message: "Score updated sucefully"
            })
        }
        else {
            res.status(404).send({
                message: "Id not found"
            });
        }
    }
    catch{
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving notes."
        });
    }
}

module.exports = {
    create,
    findAll,
    findOne,
    deleteOne,
    getStudentNotes,
    getStudentCourses,
    updateScore
}