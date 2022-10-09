const router = require('express').Router();
const auth = require('../config/auth.js');
const {
    create,
    findOne,
    deleteOne,
    getStudentNotes,
    getStudentCourses,
    findAll,
    updateScore
} = require('../controllers/notes.controller.js');

// Create a new Note
router.post('/',auth.required, create);
// Retrieve a all Notes
router.get('/',auth.optional, findAll);
// Retrieve a single Note with id
router.get('/:idNote',auth.optional, findOne);
// Delete a Note with id
router.delete('/:idNote', auth.isAdmin, deleteOne);
// Retrieve all Notes
router.get('/student/:idStudent',auth.optional, getStudentNotes);

router.get('/student/courses/:idStudent',auth.optional, getStudentCourses);
//Update the student's score
router.put ('/student/:idStudent',auth.isAdmin, updateScore)

module.exports = router;