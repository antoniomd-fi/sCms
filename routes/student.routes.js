//routes
const router = require('express').Router();
const {
    create
} = require('../controllers/students.controller.js');
// Create a new Student


/**
 * @openapi
 * /students:
 *   post:
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's name.
 *                 example: Leanne Graham
 *     responses:
 *       201:
 *         description: A list of users.
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               firstName: 
 *                type: string
 *                description: The first name of the student
 *                firstName: Victor
 *               lastName: 
 *                type: string
 *                description: The last name of the student
 *                lastName: Victor
 *          
 * 
 * 
 */ 
router.post('/', create);


// Export the router
module.exports = router;