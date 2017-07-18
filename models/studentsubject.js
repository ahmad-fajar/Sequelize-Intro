'use strict';
module.exports = function(sequelize, DataTypes) {
  var StudentSubject = sequelize.define('StudentSubject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score    : {
      type : DataTypes.INTEGER,
      validate : {
        min : 0,
        max : 100
      }
    }
  });

  StudentSubject.associate = models => {
    StudentSubject.belongsTo(models.Student);
    StudentSubject.belongsTo(models.Subject);
  }
  return StudentSubject;
};
