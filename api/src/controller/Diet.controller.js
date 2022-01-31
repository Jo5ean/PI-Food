// [ ] GET /types:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
const axios = require("axios");
const { Diet } = require('../db');
const { getAllRecipes } = require('../controller/Helper');

const getAllDiet = async (req, res, next) => {
    try{
        const pedido = await getAllRecipes();
        const diet = pedido.data.map(e => e.diet)
        //hacemos una logica para sacar aquellas dietas que estan vacias de una forma simple
        const finalDiet = diet.filter(e => e.length > 0)

        finalDiet.forEach(e => {
            if(e !== undefined) Diet.findOrCreate({ //existe? bueno lo creo (preguntar si poner findOrCreate o solo create)
                where: {
                    name: e
                }
            })
        });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getAllDiet,
};