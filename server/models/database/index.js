const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const config = require('../config/sequelize');

const sequelize = new Sequelize(config);
const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const definedModel = require(path.join(__dirname, file));
    const model = definedModel({ sequelize, DataTypes: Sequelize.DataTypes });
    db[model.name] = model;
  });

// 관계 설정
console.log(db);
// user-issue 1:N 관계
db.user.hasMany(db.issue, {
  foreignKey: 'author',
});
db.issue.belongsTo(db.user, {
  foreignKey: 'author',
});

// milestion-isuue 1:N 관계
db.milestone.hasMany(db.issue, {
  foreignKey: 'milestoneId',
});
db.issue.belongsTo(db.milestone, {
  foreignKey: 'milestoneId',
});

//

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
