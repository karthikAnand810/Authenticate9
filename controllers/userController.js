const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Contact } = require('../models');
const { validatePhoneNumber } = require('../utils/phoneValidation');
require('dotenv').config();

const register = async (req, res) => {
  const { name, phoneNumber, password, email } = req.body;

  // Check if the required fields are provided
  if (!name || !phoneNumber || !password) {
    return res.status(400).json({ error: 'Name, phone number, and password are required' });
  }

  if (!validatePhoneNumber(phoneNumber)) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }

  try {
    const existingUser = await User.findOne({ where: { phoneNumber } });
    if (existingUser) {
      return res.status(400).json({ error: 'Phone number already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, phoneNumber, password: hashedPassword, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { phoneNumber, password } = req.body;
  try {
    const user = await User.findOne({ where: { phoneNumber } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const profile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { include: [Contact] });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login, profile };
