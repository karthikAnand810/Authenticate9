const { Contact, User, Sequelize } = require('../models');
const { Op } = Sequelize;
const { validatePhoneNumber } = require('../utils/phoneValidation');

const markSpam = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const isValid = validatePhoneNumber(phoneNumber);

    if (!isValid) {
      // Mark the number as spam directly if it's invalid
      await Contact.create({ phoneNumber, userId: req.user.id, isSpam: true });
      return res.status(200).json({ message: 'Invalid number marked as spam' });
    }

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
          [Op.iLike]: `${name}%`,
        },
      },
      include: [{ model: Contact, attributes: ['phoneNumber', 'isSpam'] }],
    });

    const otherUsers = await User.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
          [Op.notILike]: `${name}%`,
        },
      },
      include: [{ model: Contact, attributes: ['phoneNumber', 'isSpam'] }],
    });

    res.json([...users, ...otherUsers]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const searchByPhoneNumber = async (req, res) => {
  const { phoneNumber } = req.query;
  try {
    const contacts = await Contact.findAll({
      where: { phoneNumber },
      include: [{ model: User, attributes: ['name', 'email'] }],
    });

    res.json(contacts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { markSpam, searchByName, searchByPhoneNumber };
