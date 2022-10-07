const router = require('express').Router();
const students = require('./student.routes.js');
const users = require('./users.routes.js');

/**
 * @openapi
 * /:
 *  get:
 *      description: Use to request all students
 *      responses:
 *          200:
 *              description: A successful response
 */
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

router.use('/students', students);
router.use('/users', users);

module.exports = router;