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
router.post('/',auth.isAdmin,create);
// Retrieve all Students
router.get('/', findAll);
// Retrieve a single Student with id
router.get('/:idStudent', findOne);
// Update a Student with id
router.patch('/:idStudent', update);
// Delete a Student with id
router.delete('/:idStudent',auth.isAdmin, deleteOne);

router.post('/' ,create);

// Export the router
module.exports = router;