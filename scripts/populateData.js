const { User, Contact } = require('../models');
const bcrypt = require('bcryptjs');

const populateData = async () => {
  try {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const users = await User.bulkCreate([
      {
        name: 'Alice',
        phoneNumber: '+91 2921907098',
        email: 'alice@example.com',
        password: hashedPassword,
      },
      {
        name: 'Bob',
        phoneNumber: '+91 4553482884',
        email: 'bob@example.com',
        password: hashedPassword,
      },
      {
        name: 'Charlie',
        phoneNumber: '+91 2223601770',
        email: 'charlie@example.com',
        password: hashedPassword,
      },
    ]);

    await Contact.bulkCreate([
      { name: 'Dave', phoneNumber: '+91 3744554960', userId: users[0].id },
      { name: 'Eve', phoneNumber: '+91 4351153604', userId: users[1].id },
      { name: 'Frank', phoneNumber: '+91 1695491801', userId: users[2].id },
    ]);

    console.log('Data populated successfully!');
  } catch (error) {
    console.error('Error populating data:', error.message);
  } finally {
    process.exit();
  }
};

populateData();
