const { Contact, User, SpamNumber, Sequelize } = require('../models');
const { Op } = Sequelize;
const { validatePhoneNumber } = require('../utils/phoneValidation');

const markSpam = async (req, res) => {
  const { phoneNumber } = req.body;

  if (!validatePhoneNumber(phoneNumber)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid phone number',
    });
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

    res.status(200).json({ success: true, message: 'Marked as spam', data: spamNumber });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const searchByName = async (req, res) => {
  const { name } = req.query;
  try {
    const usersStartWith = await User.findAll({
      where: {
        name: {
          [Op.iLike]: `${name}%`,
        },
      },
      include: [{ model: Contact, attributes: ['phoneNumber', 'isSpam'] }],
    });

    const usersContain = await User.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
          [Op.notILike]: `${name}%`,
        },
      },
      include: [{ model: Contact, attributes: ['phoneNumber', 'isSpam'] }],
    });

    const searchResults = [...usersStartWith, ...usersContain];

    res.status(200).json({
      success: true,
      message: 'Search results',
      data: searchResults,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const searchByPhoneNumber = async (req, res) => {
  const { phoneNumber } = req.query;
  try {
    // Check if there's a registered user with the phone number
    const user = await User.findOne({
      where: { phoneNumber },
      attributes: ['name', 'email'], // Include only name and email for registered users
    });

    if (user) {
      // If a registered user is found, return only that user's details
      res.status(200).json({
        success: true,
        message: 'Search results',
        data: [user],
      });
    } else {
      // If no registered user is found, return all contacts matching the phone number
      const contacts = await Contact.findAll({
        where: { phoneNumber },
        include: [{ model: User, attributes: ['name'] }], // Include user's name for each contact
      });

      res.status(200).json({
        success: true,
        message: 'Search results',
        data: contacts,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { markSpam, searchByName, searchByPhoneNumber };
