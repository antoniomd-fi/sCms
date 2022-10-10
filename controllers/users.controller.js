const User = require('../models/users.js');


async function signUp(req, res) {
    const body = req.body;
    try { 
        const user =  await User.create(body);
        const {salt, hash} = User.createPassword(body['password']);
        user.password_salt = salt;
        user.password_hash = hash;
        await user.save();
        res.status(201).json({
            "username": user.username,
            "name": user.name,
            "surname": user.surname,
            "email": user.email,
            "phone": user.phone,
            "isAdmin": user.isAdmin
        });
    } catch (err) {
        if (["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(err.name) ) {
            return res.status(400).json({
                error: err.errors.map(e => e.message)
                //error: err,
            })
        }
        else {
            throw err;
        }
    }
}
/*Sign In*/
async function logIn(req, res) {
    const body = req.body;
    try{
        const user = await User.findOne({where: {username: body['username']}});
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        if (User.validatePassword(body['password'], user.password_salt, user.password_hash)) {
            return res.status(200).json({
               // mensaje: "Bienvenido!"
               user: user.username,
               email: user.email,
               token: User.generateJWT(user)
            });
        } else {
            return res.status(400).json({mensaje: "Wrong Password"});
        }
    }
    catch(err) {
        if (["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(err.name) ) {
            return res.status(400).json({
                error: err.errors.map(e => e.message)
                //error: err,
            })
        }
        else {
            throw err;
        }
    }
}

// Retrieve all Users from the database.
async function findAll(req, res) {
    try {
        const data = await User.findAll({
            attributes:{
                exclude: ['password_hash', 'password_salt']
            }
        });
        if (data.length > 0) {
            res.send(data);
        }else {
            res.status(404).json({
                message: "No Users found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving users."
        });
    }
}

// Find a single Users with an id
async function findOne(req, res) {
    const id = req.params.idUser;
    try {
        const data = await User.findByPk(id);
        if (data) {
            res.json(data);
        }else {
            res.status(404).json({
                message: "User not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving users."
        });
    }
}

// Delete a User with the specified id in the request
async function deleteOne(req, res) {
    const id = req.params.idUser;
    try {
        const data = await User.destroy({
            where: { id: id }
        });
        if (data == 1) {
            res.json({
                message: "User was deleted successfully!"
            });
        }else {
            res.status(404).json({
                message: "User not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while deleting the User."
        });
    }
}

module.exports = { signUp, logIn, findAll, findOne, deleteOne}

