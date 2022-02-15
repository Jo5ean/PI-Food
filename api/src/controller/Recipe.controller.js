const axios = require("axios");
const { Recipe, Diet, RecipeDiet } = require("../db");
const { getAllRecipes } = require("../controller/Helper");

// [ ] GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado

const getRecipeByName = async (req, res, next) => {
  try {
    const name = req.query.name;
    let allRecipes = await getAllRecipes();
    if (name) {
      let recipeName = allRecipes.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      recipeName.length
        ? res.status(200).json(recipeName)
        : res
            .status(404)
            .json({ message: "No se encontraron recetas con ese nombre" });
    } else {
      res.status(200).json(allRecipes);
    }
  } catch (e) {
    next(e);
  }
};

// [ ] GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados

const getRecipe = async (req, res, next) => {
  try {
    const idRecipe = req.params.idRecipe;
    const allRecipes = await getAllRecipes();
    if (idRecipe) {
      let recipe = await allRecipes.filter((e) => e.id == idRecipe); //comparamos los valores luego de convertirlos a un mismo tipo de dato
      recipe.length
        ? res.status(200).json(recipe)
        : res.status(404).json({ message: "No se encontró la receta" });
    }
  } catch (e) {
    next(e);
  }
};

// [ ] POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos

const createRecipe = async (req, res, next) => {
  //tiene que ser exactamente igual que en las odels?
  try {
    let {
      name,
      image,
      summary,
      spoonacularScore,
      healthScore,
      steps,
      diets,
      createInDb,
    } = req.body;
    // console.log(req.body);
    let recipeCreated = await Recipe.create({
      name,
      image,
      summary,
      spoonacularScore,
      healthScore,
      steps,
      createInDb,
    });

    let dietDb = await Diet.findAll({
      where: { name: diets },
    });
    recipeCreated.addDiet(dietDb);
    res.status(201).send("Recipe created successfully!");
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getRecipeByName,
  getRecipe,
  createRecipe,
};
