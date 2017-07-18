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
    return queryInterface.bulkInsert('Users', [{
      username : 'johndoe',
      password : 'foobar',
      role     : 'Teacher',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username : 'charlesxavier',
      password : 'magnetowhy',
      role     : 'Headmaster',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username : 'pakdengklek',
      password : 'gogetgold',
      role     : 'Academic',
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
