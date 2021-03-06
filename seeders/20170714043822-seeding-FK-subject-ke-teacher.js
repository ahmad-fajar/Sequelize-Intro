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
    return queryInterface.bulkInsert('Teachers', [{
      SubjectId : 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      SubjectId : 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      SubjectId : 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      SubjectId : 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      SubjectId : 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      SubjectId : 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
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
