const router = require('express').Router();
const {
    create,
    findOne,
    deleteOne,
    getStudentNotes,
    getStudentCourses,
    findAll
} = require('../controllers/notes.controller.js');

// Create a new Note
router.post('/', create);
// Retrieve a all Notes
router.get('/', findAll);
// Retrieve a single Note with id
router.get('/:idNote', findOne);
// Delete a Note with id
router.delete('/:idNote', deleteOne);
// Retrieve all Notes
router.get('/student/:idStudent', getStudentNotes);

router.get('/student/courses/:idStudent', getStudentCourses);

module.exports = router;