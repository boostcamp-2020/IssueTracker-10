module.exports = ({ sequelize, DataTypes }) => {
  return sequelize.define('comment', {
    content: {
      type: DataTypes.STRING(5000),
      allowNull: true,
    },
  });
};
