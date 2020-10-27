module.exports = ({ sequelize, DataTypes }) => {
  return sequelize.define('emoticon', {
    image: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  });
};
