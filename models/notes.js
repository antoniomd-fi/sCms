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
Student.hasMany(Notes, {
    foreignKey: 'studentId',
    sourceKey: 'id'
});
Notes.belongsTo(Student, {
    foreignKey:'studentId',
    targetKey:'id'
});
// Relationship between Notes and Course
Course.hasMany(Notes,{
    foreignKey: 'noteId',
    sourceKey: 'id'
});
Notes.belongsTo(Course, {
    foreignKey:'noteId',
    targetKey:'id'
});

module.exports = Notes;