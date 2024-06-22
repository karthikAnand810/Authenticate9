const { Contact, User, SpamNumber, Sequelize } = require('../models');
const { Op } = Sequelize;
const { validatePhoneNumber } = require('../utils/phoneValidation');

const markSpam = async (req, res) => {
  const { phoneNumber } = req.body;

  if (!validatePhoneNumber(phoneNumber)) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }

  try {
    // Check if the number is already marked as spam
    let spamNumber = await SpamNumber.findOne({ where: { phoneNumber } });

    if (spamNumber) {
      // Increment the spam count if already marked
      spamNumber.spamCount += 1;
      await spamNumber.save();
    } else {
      // Create a new spam entry if not already marked
      spamNumber = await SpamNumber.create({ phoneNumber });
    }

    res.status(200).json({ message: 'Marked as spam', spamNumber });
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
