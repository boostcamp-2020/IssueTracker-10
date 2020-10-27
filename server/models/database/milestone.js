module.exports = ({ sequelize, DataTypes }) => {
  return sequelize.define('milestone', {
    title: {
      type: DataTypes.STRING(765),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(5000),
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
};
