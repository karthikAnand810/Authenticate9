const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/contacts', contactRoutes);

// Function to start the server
function startServer() {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Synchronize models and then start server (only in development)
if (process.env.NODE_ENV === 'development') {
  sequelize
    .sync({ force: false }) // Use { force: true } to drop and recreate tables on each startup (not recommended for production)
    .then(() => {
      console.log('Database synchronized');
      startServer();
    })
    .catch((err) => {
      console.error('Unable to synchronize the database:', err);
    });
} else {
  startServer(); // Start server without synchronizing models in other environments
}
