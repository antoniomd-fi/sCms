const router = require('express').Router();
const {signUp, logIn, findAll, findOne, deleteOne} = require('../controllers/users.controller.js');
const auth = require('../config/auth.js');

router.post('/signUp',auth.optional, signUp);
router.post('/logIn',auth.optional, logIn);
router.get('/',auth.isAdmin, findAll);
router.get('/:idUser',auth.isAdmin, findOne);
router.delete('/:idUser',auth.isAdmin, deleteOne)

module.exports = router;