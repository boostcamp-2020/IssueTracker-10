module.exports = ({ sequelize }) => {
  return sequelize.define('reaction', {}, { timestamps: false });
};
