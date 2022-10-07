const router = require('express').Router();

// Import the courses controller
const {
    create,
    findAll,
    findOne,
    update,
    deleteOne,
} = require('../controllers/courses.controller.js');

// Create a new Course
router.post('/', create);
// Retrieve all Courses
router.get('/', findAll);
// Retrieve a single Course with id
router.get('/:id', findOne);
// Update a Course with id
router.put('/:id', update);
// Delete a Course with id
router.delete('/:id', deleteOne);

module.exports = router;