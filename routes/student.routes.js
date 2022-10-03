//routes
const router = require('express').Router();
const {
    create
} = require('../controllers/students.controller.js');
// Create a new Student
router.post('/', create);

// Export the router
module.exports = router;