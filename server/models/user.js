const sequelize = require('sequelize');
const { user } = require('./database');
const ERROR_MSG = require('../services/errorMessages');

const { Op } = sequelize;

const findUserById = async (id) => {
  try {
    const userInfo = await user.findOne({
      attributes: ['id', 'username', 'avatar'],
      where: { id },
    });
    return userInfo;
  } catch (err) {
    throw new Error(ERROR_MSG.notFound);
  }
};

const findOrCreateUserById = async ({ username, avatar, state = 1 }) => {
  try {
    const [userInfo] = await user.findOrCreate({
      attributes: ['id', 'username'],
      where: { username, state },
      defaults: { username, state, avatar },
      raw: true,
    });

    return userInfo;
  } catch (err) {
    throw new Error(ERROR_MSG.invalid);
  }
};

const findUserAll = async () => {
  try {
    const users = await user.findAll({
      attributes: ['id', 'username', 'avatar'],
    });

    return users;
  } catch (err) {
    throw new Error(ERROR_MSG.notFound);
  }
};

const countUserByIds = async (userIds) => {
  try {
    const result = await user.count({ where: { id: { [Op.in]: userIds } } });
    return result;
  } catch (err) {
    throw new Error(ERROR_MSG.delete);
  }
};

module.exports = {
  findUserById,
  findOrCreateUserById,
  findUserAll,
  countUserByIds,
};
