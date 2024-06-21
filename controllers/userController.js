// controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Contact } = require('../models');

const register = async (req, res) => {
  const { name, phoneNumber, password, email } = req.body;
  try {
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
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
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
