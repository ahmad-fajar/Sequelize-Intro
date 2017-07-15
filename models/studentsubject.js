'use strict';
module.exports = function(sequelize, DataTypes) {
  var StudentSubject = sequelize.define('StudentSubject', {
    StudentsId: DataTypes.INTEGER,
    SubjectsId: DataTypes.INTEGER
  });

  StudentSubject.associate = models => {
    StudentSubject.belongsTo(models.Student);
    StudentSubject.belongsTo(models.Subject);
  }
  return StudentSubject;
};
