const { user } = require('./database');
const errorMessages = require('../services/errorMessages');

const userType = {
  local: 0,
  github: 1,
};

const findUserById = async (id) => {
  try {
    const userInfo = await user.find({
      attributes: ['id', 'username'],
      where: { id },
    });

    return userInfo;
  } catch (err) {
    throw new Error(errorMessages.user.notFoundError);
  }
};

const findOrCreateUserById = async ({ username, avatar }) => {
  try {
    const userInfo = await user.findOrCreate({
      attributes: ['id', 'username'],
      where: { username },
      defaults: { username, state: userType.github, avatar },
    });

    return userInfo;
  } catch (err) {
    throw new Error(errorMessages.user.invalidUsername);
  }
};

const findUserAll = async () => {
  try {
    const users = await user.findAll({
      attributes: ['id', 'username', 'avatar'],
    });

    return users;
  } catch (err) {
    throw new Error(errorMessages.user.notFoundError);
  }
};

module.exports = {
  findUserById,
  findOrCreateUserById,
  findUserAll,
};
