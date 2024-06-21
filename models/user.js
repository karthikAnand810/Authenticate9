// models/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: DataTypes.STRING,
      phoneNumber: { type: DataTypes.STRING, unique: true },
      email: DataTypes.STRING,
      password: DataTypes.STRING
    }, {});
    
    User.associate = function(models) {
      User.hasMany(models.Contact, { foreignKey: 'userId' });
    };
  
    return User;
  };
  