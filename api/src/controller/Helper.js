const axios = require ('axios');
const { Recipe, Diet } = require ('../db');
const { YOUR_API_KEY } = process.env;

const getAllRecipes = async (req, res, next) => {
    const pedido = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);

    const dbInfo = await Recipe.findAll({include:{
        model: Diet,
        attributes: ['name'],
        through: {
            attributes: [],
        },
    }
});
if(pedido || dbInfo){
    const apiInfo = pedido.data.results.map(e => {
        return {
            id: e.id,
            name: e.title,
            image: e.image,
            summary: e.summary,
            spoonacularScore: e.spoonacularScore,
            healthScore: e.healthScore,
            analyzedInstructions: e.analyzedInstructions.map(e => e.steps.map(e => e.step)).flat(1).join(''),
            diet: e.diets
        };
        });
    let final = [...apiInfo, ...dbInfo];
    console.log(final);
    return final;
    
}
};

module.exports = {
    getAllRecipes,
};

