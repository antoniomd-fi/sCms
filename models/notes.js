const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');
const Student = require('./students.js');
const Course = require('./courses.js');


const Notes = sequelize.define('Notes',{
    score:{
        type: DataTypes.DECIMAL(3,2),
        allowNull: false
    },
});

// Relationship between Notes and Student
Notes.belongsTo(Student);
Student.hasMany(Notes);
// Relationship between Notes and Course
Notes.belongsTo(Course);
Course.hasMany(Notes);

module.exports = Notes;