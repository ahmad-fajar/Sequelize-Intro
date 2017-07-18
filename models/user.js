'use strict';

const crypt = require('../helpers/crypt.js')
const keygen = require('../helpers/keygen.js')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks : {
      beforeCreate : user => {
        let salt = keygen()
        user.password = crypt(user.password, salt)
        user.salt = salt
      }
    }
  });
  return User;
};

// console.log(crypt('pass123', 'garam'));
// console.log(keygen());
// console.log(crypt('pass123', keygen()));