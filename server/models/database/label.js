module.exports = ({ sequelize, DataTypes }) => {
  return sequelize.define('label', {
    title: {
      type: DataTypes.STRING(320),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  });
};
