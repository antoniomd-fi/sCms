const router = require('express').Router();
const {
    create,
    findOne,
    deleteOne,
    getStudentNotes
} = require('../controllers/notes.controller.js');

// Create a new Note
router.post('/', create);
// Retrieve a single Note with id
router.get('/:id', findOne);
// Delete a Note with id
router.delete('/:id', deleteOne);
// Retrieve all Notes
router.get('/student/:id', getStudentNotes);

module.exports = router;