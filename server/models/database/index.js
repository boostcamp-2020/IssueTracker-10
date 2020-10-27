const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const config = require('../config/sequelize');

const db = {};

const sequelize = new Sequelize({
  host: config.host,
  username: config.username,
  password: config.password,
  prot: config.port,
  database: config.database,
  dialect: config.dialect,
});

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

// ----

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
