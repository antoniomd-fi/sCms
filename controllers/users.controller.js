const User = require('../models/users.js');

async function create(req, res) {
    // Validate request
    if (!req.body.username || !req.body.name || !req.body.surname || !req.body.email || !req.body.phone || !req.body.isAdmin || !req.body.password_hash || !req.body.password_salt) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a User
    const user = {
        username: req.body.username,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        password_hash: req.body.password_hash,
        password_salt: req.bo.password_salt
    };

    // Save User in the database
    try {
        const data = await User.create(user);
        res.send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Student."
        });
    }
}

async function signUp(req, res) {
    const body = req.body;
    try { 
        const user = await User.create(body);
        const {salt, hash} = User.createPassword(body['password']);
        user.password_salt = salt;
        user.password_hash = hash;
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        if (["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(err.name) ) {
            return res.status(400).json({
                error: err.errors.map(e => e.message)
            })
        }
        else {
            throw err;
        }
    }
}

async function logIn(req, res) {
    const body = req.body;
    const user = await User.findOne({where: {username: body['username']}});
    if (!user) {
        return res.status(404).json({error: "User not found"});
    }
    if (User.validatePassword(body['password'], user.password_salt, user.password_hash)) {
        return res.status(200).json({mensaje: "Bienvenido!"});
    } else {
        return res.status(400).json({mensaje: "Password Incorrecto"});
    }
}

module.exports = { signUp, logIn }
