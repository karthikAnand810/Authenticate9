module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      indexes: [
        { unique: true, fields: ['phoneNumber'] }, // Index on phoneNumber for quick lookup
        { fields: ['name'] }, // Index on name for faster searching
      ],
    },
  );

  User.associate = function (models) {
    User.hasMany(models.Contact, { foreignKey: 'userId' });
  };

  return User;
};
