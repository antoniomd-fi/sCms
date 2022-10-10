//routes
const router = require('express').Router();
const auth = require('../config/auth.js')
const {
    create,
    findAll,
    findOne,
    update,
    deleteOne,
} = require('../controllers/students.controller.js');

// Create a new Student
router.post('/',auth.required,create);
// Retrieve all Students
router.get('/', auth.optional,findAll);
// Retrieve a single Student with id
router.get('/:idStudent', auth.optional,findOne);
// Update a Student with id
router.patch('/:idStudent',auth.optional, update);
// Delete a Student with id
router.delete('/:idStudent',auth.required, deleteOne);

// Export the router
module.exports = router;