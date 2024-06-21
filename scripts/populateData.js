const { User, Contact } = require('../models');
const bcrypt = require('bcryptjs');

const populateData = async () => {
  try {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const users = await User.bulkCreate([
      {
        name: 'Alice',
        phoneNumber: '1234567890',
        email: 'alice@example.com',
        password: hashedPassword,
      },
      {
        name: 'Bob',
        phoneNumber: '0987654321',
        email: 'bob@example.com',
        password: hashedPassword,
      },
      {
        name: 'Charlie',
        phoneNumber: '1122334455',
        email: 'charlie@example.com',
        password: hashedPassword,
      },
    ]);

    await Contact.bulkCreate([
      { name: 'Dave', phoneNumber: '5555555555', userId: users[0].id },
      { name: 'Eve', phoneNumber: '6666666666', userId: users[1].id },
      { name: 'Frank', phoneNumber: '7777777777', userId: users[2].id },
    ]);

    console.log('Data populated successfully!');
  } catch (error) {
    console.error('Error populating data:', error.message);
  } finally {
    process.exit();
  }
};

populateData();
