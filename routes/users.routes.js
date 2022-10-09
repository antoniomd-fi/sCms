const router = require('express').Router();
const {signUp, logIn, findAll, findOne, deleteOne} = require('../controllers/users.controller.js');
const auth = require('../config/auth.js');

router.post('/signUp', signUp);
router.post('/logIn', logIn);
router.get('/', findAll);
router.get('/:idUser', findOne);
router.delete('/:idUser',auth.isAdmin, deleteOne)


module.exports = router;
