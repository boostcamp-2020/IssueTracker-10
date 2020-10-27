module.exports = ({ sequelize, DataTypes }) => {
  return sequelize.define('issue', {
    title: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    state: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  });
};
