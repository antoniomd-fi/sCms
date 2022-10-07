const router = require('express').Router();
const students = require('./student.routes.js');
const courses = require('./courses.routes.js');
const notes = require('./notes.routes.js');
const users = require('./users.routes.js');

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

router.use('/students', students);
router.use('/courses', courses);
router.use('/notes', notes);
router.use('/users', users);

module.exports = router;