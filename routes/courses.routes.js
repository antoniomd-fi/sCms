const router = require('express').Router();

// Import the courses controller
const {
    create,
    findAll,
    findOne,
    update,
    deleteOne
} = require('../controllers/courses.controller.js');

// Create a new Course
router.post('/', create);
// Retrieve all Courses
router.get('/', findAll);
// Retrieve a single Course with id
router.get('/:idCourse', findOne);
// Update a Course with id
router.patch('/:idCourse', update);
// Delete a Course with id
router.delete('/:idCourse', deleteOne);

module.exports = router;