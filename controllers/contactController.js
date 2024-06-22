const { Contact, User, SpamNumber, Sequelize } = require('../models');
const { Op } = Sequelize;
const { validatePhoneNumber } = require('../utils/phoneValidation');

const markSpam = async (req, res) => {
  const { phoneNumber } = req.body;

  if (!validatePhoneNumber(phoneNumber)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid phone number. Please provide a valid phone number.',
    });
  }

  try {
    let spamNumber = await SpamNumber.findOne({ where: { phoneNumber } });

    if (spamNumber) {
      spamNumber.spamCount += 1;
    } else {
      spamNumber = await SpamNumber.create({ phoneNumber });
    }

    await spamNumber.save();

    res.status(200).json({ success: true, message: 'Marked as spam', data: spamNumber });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const searchByName = async (req, res) => {
  const { name, page, pageSize } = req.query;
  const limit = parseInt(pageSize) || 10;
  const offset = (parseInt(page) - 1) * limit || 0;

  try {
    const users = await User.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `${name}%`,
        },
      },
      include: [{ model: Contact, attributes: ['phoneNumber', 'isSpam'] }],
      limit,
      offset,
    });

    res.status(200).json({
      success: true,
      message: 'Search results',
      data: users.rows,
      total: users.count,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const searchByPhoneNumber = async (req, res) => {
  const { phoneNumber, page = 1, pageSize = 10 } = req.query; // Default page size to 10

  const limit = parseInt(pageSize, 10);
  const offset = (parseInt(page, 10) - 1) * limit;

  try {
    const user = await User.findOne({
      where: { phoneNumber },
      attributes: ['name', 'email', 'phoneNumber'],
    });

    if (user) {
      res.status(200).json({
        success: true,
        message: 'Search result',
        data: user,
      });
    } else {
      const contacts = await Contact.findAndCountAll({
        where: { phoneNumber },
        include: [{ model: User, attributes: ['name', 'phoneNumber'] }],
        limit,
        offset,
      });

      res.status(200).json({
        success: true,
        message: 'Search results',
        data: contacts.rows, // Send only the current page of results
        total: contacts.count, // Total count of matching records
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { markSpam, searchByName, searchByPhoneNumber };
