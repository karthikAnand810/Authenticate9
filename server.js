const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
require('dotenv').config();
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to Spam Detection API');
});

app.use('/users', userRoutes);
app.use('/contacts', contactRoutes);

// Function to start the server
function startServer() {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

sequelize
  .sync({ force: false }) // Use { force: true } to drop and recreate tables on each startup (not recommended for production)
  .then(() => {
    console.log('Database synchronized');
    startServer();
  })
  .catch((err) => {
    console.error('Unable to synchronize the database:', err);
  });
