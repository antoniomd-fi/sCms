'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Course', [
      {
        name: 'Math I',
      },
      {
        name: 'Spanish I',
      },
      {
        name: 'Math II',
      },
      {
        name: 'Spanish II',
      },
      {
        name: 'History I',
      },

    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Course', null, {});
    
  }
};