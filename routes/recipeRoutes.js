const express = require('express');
const Recipe = require('../models/recipe');
const router = express.Router();

// GET - Pobieranie wszystkich przepisów
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();  // Pobierz wszystkie przepisy
    res.json(recipes);  // Zwróć przepisy w formacie JSON
  } catch (err) {
    res.status(500).send('Błąd podczas pobierania przepisów');
  }
});

// POST - Dodawanie nowego przepisu
router.post('/', async (req, res) => {
  const { name, ingredients, instructions, rating } = req.body;
  const recipe = new Recipe({ name, ingredients, instructions, rating });

  try {
    const savedRecipe = await recipe.save();  // Zapisz przepis w bazie
    res.status(201).json(savedRecipe);  // Zwróć zapisany przepis
  } catch (err) {
    res.status(400).send('Błąd podczas zapisywania przepisu');
  }
});

// PUT - Aktualizacja przepisu
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, instructions, rating } = req.body;

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, {
      name,
      ingredients,
      instructions,
      rating
    }, { new: true });

    if (!updatedRecipe) {
      return res.status(404).send('Przepis nie znaleziony');
    }

    res.json(updatedRecipe);  // Zwróć zaktualizowany przepis
  } catch (err) {
    res.status(400).send('Błąd podczas aktualizacji przepisu');
  }
});

// DELETE - Usuwanie przepisu
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res.status(404).send('Przepis nie znaleziony');
    }

    res.send('Przepis usunięty');
  } catch (err) {
    res.status(500).send('Błąd podczas usuwania przepisu');
  }
});

module.exports = router;
