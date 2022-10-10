const router = require('express').Router();
const auth = require('../config/auth.js')

// Import the courses controller
const {
    create,
    findAll,
    findOne,
    update,
    deleteOne
} = require('../controllers/courses.controller.js');

// Create a new Course
router.post('/',auth.required, create);
// Retrieve all Courses
router.get('/',auth.optional, findAll);
// Retrieve a single Course with id
router.get('/:idCourse',auth.optional, findOne);
// Update a Course with id
router.patch('/:idCourse',auth.required, update);
// Delete a Course with id
router.delete('/:idCourse',auth.required, deleteOne);

module.exports = router;