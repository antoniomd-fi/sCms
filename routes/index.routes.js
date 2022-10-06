const router = require('express').Router();
const students = require('./student.routes.js');

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

router.use('/students', students);

module.exports = router;