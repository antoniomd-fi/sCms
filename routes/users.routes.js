const router = require('express').Router();
const {signUp, logIn, findAll, findOne } = require('../controllers/users.controller.js');

router.post('/signUp', signUp);
router.post('/logIn', logIn);
router.get('/', findAll);
router.get('/:idUser', findOne);


module.exports = router;
