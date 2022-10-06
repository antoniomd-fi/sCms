const router = require('express').Router();
const { create, signUp, logIn } = require('../controllers/users.controller.js');

router.post('/signUp', signUp);
router.post('/logIn', logIn);
//router.post('/', create);

module.exports = router;
