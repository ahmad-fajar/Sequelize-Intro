'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
  //   email: DataTypes.STRING
  // })
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args : true,
          msg : 'Invalid email address.'
        }
      }
    }
  })

  Student.associate = models => {
    Student.belongsToMany(models.Subject, { through : 'StudentSubjects' });
  };

  return Student;
};