const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Student = sequelize.define('Student',{
    firstname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    fullname:{
        type: DataTypes.VIRTUAL,
        get(){
            return this.firstname + ' ' + this.lastname;
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        }
    },
    group:{
        type: DataTypes.STRING,
        allowNull: false
    }
}); 

module.exports = Student;