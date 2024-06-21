// models/contact.js
module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('Contact', {
      name: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      isSpam: DataTypes.BOOLEAN
    }, {});
    
    Contact.associate = function(models) {
      Contact.belongsTo(models.User, { foreignKey: 'userId' });
    };
  
    return Contact;
  };
  