const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Course = sequelize.define('Course',{
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Course;