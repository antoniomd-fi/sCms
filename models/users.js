
const crypto = require('crypto');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret.js');

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[a-zA-Z0-9_-]+$/
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^\+[0-9][0-9]\d{10}$/
        }
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password_salt: {
        type: DataTypes.STRING,
        allowNull: true,
    },

}/*,{
    defaultScope: {
        attributes:{
            exclude: ['password_hash', 'password_salt']
        }
    }
}*/
);

User.createPassword = function (plainText) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
        .pbkdf2Sync(plainText, salt, 10000, 512, "sha512")
        .toString("hex");
    return { salt: salt, hash: hash }
}

User.validatePassword = function (password, user_salt, user_hash) {
    const hash = crypto
        .pbkdf2Sync(password, user_salt, 10000, 512, "sha512")
        .toString("hex");
    return user_hash === hash;
}

User.generateJWT = function (user){
    const today = new Date();
    const exp = new Date (today);
    exp.setDate (today.getDate()+1);

    return jwt.sign({
        user: user.username,
        admin: user.isAdmin,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
}

module.exports = User;