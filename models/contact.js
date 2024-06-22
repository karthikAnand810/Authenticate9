module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    'Contact',
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
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isSpam: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {},
  );

  Contact.associate = function (models) {
    Contact.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Contact;
};
