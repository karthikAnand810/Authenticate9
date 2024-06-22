module.exports = (sequelize, DataTypes) => {
  const SpamNumber = sequelize.define(
    'SpamNumber',
    {
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      spamCount: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      indexes: [
        { unique: true, fields: ['phoneNumber'] }, // Index on phoneNumber for quick lookup
      ],
    },
  );

  return SpamNumber;
};
