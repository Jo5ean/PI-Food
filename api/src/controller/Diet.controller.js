// [ ] GET /types:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
const axios = require("axios");
const { Diet } = require("../db");
// const { getAllRecipes } = require('../controller/Helper');
const { YOUR_API_KEY } = process.env;

const getAllDiet = async (req, res, next) => {
  try {
    const recipes = await Diet.findAll();
    if (!recipes.length) {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
      );
      // console.log(response.data.results);

      let dbDiet = response.data.results.map((e) => {
        return e.diets;
      });
      //  console.log(dbDiet);
      const array = [];
      dbDiet.forEach((e) => {
        e.forEach((element) => {
          array.push(element);
        });
      });
      // console.log(array);

      var unique = [...new Set(array)];
      // console.log(unique);

      //finalmente cargamos la base de datos
      await Promise.all(
        unique.map((e) => {
          Diet.create({ name: e });
        })
      );
      res.json(unique);
    } else {
      res.json(recipes);
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllDiet,
};
