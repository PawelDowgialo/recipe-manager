const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/recipe-manager', {
})
  .then(() => {
    console.log('Połączono z MongoDB');
  })
  .catch(err => {
    console.log('Błąd połączenia z MongoDB:', err);
  });

app.use(express.json());

const recipeRoutes = require('./routes/recipeRoutes');
app.use('/recipes', recipeRoutes);

app.listen(3000, () => {
  console.log('Serwer działa na http://localhost:3000');
});
