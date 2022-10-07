const router = require('express').Router();
const {signUp, logIn } = require('../controllers/users.controller.js');

router.post('/signUp', signUp);
router.post('/logIn', logIn);


module.exports = router;
