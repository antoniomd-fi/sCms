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
router.get('/', findAll);
// Retrieve a single Note with id
router.get('/:idNote', findOne);
// Delete a Note with id
router.delete('/:idNote', auth.isAdmin, deleteOne);
// Retrieve all Notes
router.get('/student/:idStudent', getStudentNotes);

router.get('/student/courses/:idStudent', getStudentCourses);
//Update the student's score
router.put ('/student/:idStudent',auth.required, updateScore)

module.exports = router;