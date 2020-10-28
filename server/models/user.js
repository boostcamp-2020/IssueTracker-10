const { user } = require('./database');

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
    throw new Error('유저 데이터 find 실패');
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
    throw new Error('유저 데이터 findOrCreate 실패');
  }
};

module.exports = {
  findUserById,
  findOrCreateUserById,
};
