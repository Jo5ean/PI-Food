const { Router } = require('express');
//importamos funciones del controlador
const { getRecipeByName, getRecipe, createRecipe } = require('../controller/Recipe.controller');

const router = Router();

//------- localhot:3000/recipe/ ------

//GET
router.get('/get', getRecipeByName);
router.get('/get/:idRecipe', getRecipe);

//POST
router.post('/post', createRecipe);

module.exports = router;
