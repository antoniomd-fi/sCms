//routes
const router = require('express').Router();
const {
    create,
    findAll,
    findOne,
    update,
    deleteOne,
} = require('../controllers/students.controller.js');

// Create a new Student
router.post('/', create);
// Retrieve all Students
router.get('/', findAll);
// Retrieve a single Student with id
router.get('/:id', findOne);
// Update a Student with id
router.put('/:id', update);
// Delete a Student with id
router.delete('/:id', deleteOne);

router.post('/' ,create);

// Export the router
module.exports = router;