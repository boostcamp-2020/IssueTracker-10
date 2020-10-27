module.exports = ({ sequelize, DataTypes }) => {
  return sequelize.define('user', {
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    state: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING(250),
      defaultValue:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg',
    },
    password: {
      type: DataTypes.STRING(250),
    },
  });
};
