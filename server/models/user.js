const { user } = require('./database');

const userType = {
  local: 0,
  github: 1,
};

const findUserById = (userId) => {
  try {
    // TODO : DB에서 user select 해오기
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
