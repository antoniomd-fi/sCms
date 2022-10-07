'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Student', [
      {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@scms.edu',
        group: '304'
      },
      {
        firstname: 'Laura',
        lastname: 'Smith',
        email: 'laura.smith@scms.edu',
        group: '105'
      },
      {
        firstname: 'Daniel',
        lastname: 'Vettel',
        email: 'daniel.vettel@scms.edu',
        group: '501'
      },
      {
        firstname: 'Richard',
        lastname: 'Hamilton',
        email: 'richard.hamilton@scms.edu',
        group: '304'
      },
      {
        firstname: 'Karen',
        lastname: 'Russell',
        email: 'karen.russell@scms.edu',
        group: '501'
      },


    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Student', null, {});
    
  }
};
