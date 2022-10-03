const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Course = sequelize.define('Course',{
    name:{
        type: DataTypes.CHAR(64),
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Course;