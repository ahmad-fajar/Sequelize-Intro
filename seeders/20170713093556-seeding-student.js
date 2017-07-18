'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
      */
      return queryInterface.bulkInsert('Students', [{
        first_name: 'John',
        last_name: 'Doe',
        email: 'doea@mailer.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        first_name: 'John',
        last_name: 'Smith',
        email: 'j.smith@microsoft.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        first_name: 'Dumb',
        last_name: 'Dumber',
        email: 'dumbest@baka.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        first_name: 'Tenkou',
        last_name: 'Sei',
        email: 't.sei@student.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        first_name: 'Transferred',
        last_name: 'Student',
        email: 'transfer@student.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        first_name: 'Fulan',
        last_name: 'bin Fulan',
        email: 'fulanah@wew.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
