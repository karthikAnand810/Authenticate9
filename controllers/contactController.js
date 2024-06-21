// controllers/contactController.js
const { Contact, User } = require('../models');

const markSpam = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const contact = await Contact.findOne({ where: { phoneNumber, userId: req.user.id } });
    if (contact) {
      contact.isSpam = true;
      await contact.save();
    } else {
      await Contact.create({ phoneNumber, userId: req.user.id, isSpam: true });
    }
    res.status(200).json({ message: 'Marked as spam' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const searchByName = async (req, res) => {
  const { name } = req.query;
  try {
    const users = await User.findAll({
      where: {
        name: {
          [Op.iLike]: `${name}%`
        }
      },
      include: [Contact]
    });
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const searchByPhoneNumber = async (req, res) => {
  const { phoneNumber } = req.query;
  try {
    const contacts = await Contact.findAll({
      where: { phoneNumber },
      include: [User]
    });
    res.json(contacts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { markSpam, searchByName, searchByPhoneNumber };
