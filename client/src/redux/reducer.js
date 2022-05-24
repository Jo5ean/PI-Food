import {
  GET_RECIPES,
  GET_DIETS,
  GET_DETAILS,
  FILTER_BY_DIET,
  FILTER_BY_ORIGIN,
  SORT_BY_NAME,
  SORT_BY_SCORE,
  POST_RECIPE,
  GET_SCORE
} from "./actions.js";

const initialState = {
  recipes: [],
  allRecipes: [], //declaramos un estado inicial que va a ser el que se modifica, de esta manera no tengo que recargar la pagina cuando hago algun filtro
  diets: [],
  details: [], //consultar este objeto, es array u objeto?
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SCORE:
      console.log(action.payload)
      return{
        ...state,
        recipes: action.payload,
      }
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case FILTER_BY_DIET:
      const allRecipes = state.allRecipes; //utilizamos la variable auxiliar para no modificar el estado inicial
  
      const recipeFiltered =
        action.payload === "all"
          ? allRecipes
          : allRecipes.filter((e) => {
              //este es el caso que por receta llegue una sola dieta
              if (e.diet)
                return e.diet.includes(action.payload);
              //este caso en cambio es cuando en diets llega un array de dietas, realizamos la logica correspondiente
              if (e.diets) {
                let aux = e.diets.map((e) => e.name);
                return aux.includes(action.payload);
              }
              return true; //esto nose para que es, preguntaremos
            });
      return {
        ...state,
        recipes: recipeFiltered,
      };
    case FILTER_BY_ORIGIN:
      const all = state.allRecipes;
      const originFiltered =
        action.payload === "all"
          ? all
          : action.payload === "created"
          ? all.filter((e) => e.createInDb)
          : action.payload === "api"
          ? all.filter((e) => !e.createInDb)
          : all;
      return {
        ...state,
        recipes: originFiltered,
      };
    case SORT_BY_NAME:
      const sortedName =
        action.payload === "asc"
          ? state.recipes.sort((a, b) => a.name.localeCompare(b.name))
          : action.payload === "desc"
          ? state.recipes.sort((a, b) => b.name.localeCompare(a.name))
          : state.recipes;
      return {
        ...state,
        recipes: sortedName,
      };
    case SORT_BY_SCORE:
      const sortedScore =
        action.payload === "asc"?
        state.recipes.sort(function (a, b) {
        if(a.spoonacularScore > b.spoonacularScore){
           return 1;
        }
        if(a.spoonacularScore < b.spoonacularScore){
          return -1;
        }
        return 0;
      }) : state.recipes.sort(function(a, b){
        if(a.spoonacularScore > b.spoonacularScore){
           return -1;
           }
           if(a.spoonacularScore < b.spoonacularScore){
             return 1;
             }
             return 0;
             });
       
          // ? state.recipes.sort((a, b) => a.spoonacularScore - b.spoonacularScore)
          // : action.payload === "desc"
          // ? state.recipes.sort((a, b) => b.spoonacularScore - a.spoonacularScore)
          // : state.recipes;
      return {
        ...state,
        recipes: sortedScore,
      };
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case POST_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload], //pot que los argumentos aca? 
      };
    default:
      return state;
  }
}

export default rootReducer;
