const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const config = require('../config/sequelize');

const sequelize = new Sequelize(config);
const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const definedModel = require(path.join(__dirname, file));
    const model = definedModel({ sequelize, DataTypes: Sequelize.DataTypes });
    db[model.name] = model;
  });

// 관계 설정
// user-issue 1:N 관계
db.user.hasMany(db.issue, {
  foreignKey: 'author',
});
db.issue.belongsTo(db.user, {
  as: 'owner',
  foreignKey: 'author',
});

// milestion-issue 1:N 관계
db.milestone.hasMany(db.issue, {
  foreignKey: 'milestoneId',
});
db.issue.belongsTo(db.milestone, {
  foreignKey: 'milestoneId',
});

// label-issue M:N 관계
db.issue.belongsToMany(db.label, { through: 'issueLabel', timestamps: false });
db.label.belongsToMany(db.issue, { through: 'issueLabel', timestamps: false });

// user-issue M:N 관계 (assignee)
db.user.belongsToMany(db.issue, {
  through: 'issueAssignee',
  timestamps: false,
});
db.issue.belongsToMany(db.user, {
  through: 'issueAssignee',
  as: 'assignees',
  timestamps: false,
});

// user-comment 1:N 관계
db.user.hasMany(db.comment, {
  foreignKey: 'userId',
});
db.comment.belongsTo(db.user, {
  foreignKey: 'userId',
});

// issue-comment 1:N 관계
db.issue.hasMany(db.comment, {
  foreignKey: 'issueId',
});
db.comment.belongsTo(db.issue, {
  foreignKey: 'issueId',
});

// user-reaction 1:N 관계
db.user.hasMany(db.reaction, {
  foreignKey: 'userId',
});
db.reaction.belongsTo(db.user, {
  foreignKey: 'userId',
});

// emoticon-reaction 1:N 관계
db.emoticon.hasMany(db.reaction, {
  foreignKey: 'emoticonId',
});
db.reaction.belongsTo(db.emoticon, {
  foreignKey: 'emoticonId',
});

// comment-reaction 1:N 관계
db.comment.hasMany(db.reaction, {
  foreignKey: 'commentId',
});
db.reaction.belongsTo(db.comment, {
  foreignKey: 'commentId',
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
