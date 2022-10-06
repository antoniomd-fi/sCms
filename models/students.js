const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Student = sequelize.define('Student',{
    firstname:{
        type: DataTypes.CHAR(64),
        allowNull: false
    },
    lastname:{
        type: DataTypes.CHAR(64),
        allowNull: false
    },
    fullname:{
        type: DataTypes.VIRTUAL,
        get(){
            return this.firstname + ' ' + this.lastname;
        }
    },
    email:{
        type: DataTypes.CHAR(64),
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        }
    },
    group: {
        type: DataTypes.CHAR(64),
        allowNull: false
    }
}); 

module.exports = Student;