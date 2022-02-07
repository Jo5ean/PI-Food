import {
  GET_RECIPES,
  GET_DIETS,
  GET_DETAILS,
  FILTER_BY_DIET,
  FILTER_BY_ORIGIN,
  SORT_BY_NAME,
  SORT_BY_SCORE,
  POST_RECIPE,
} from "./actions.js";

const initialState = {
  recipes: [],
  allRecipes: [], //declaramos un estado inicial que va a ser el que se modifica, de esta manera no tengo que recargar la pagina cuando hago algun filtro
  diets: [],
  details: [], //consultar este objeto
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
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
        action.payload === "All"
          ? allRecipes
          : allRecipes.filter((e) => {
              //este es el caso que por receta llegue una sola dieta
              if (typeof e.diets === "string")
                return e.diets.includes(action.payload);
              //este caso en cambio es cuando en diets llega un array de dietas, realizamos la logica correspondiente
              if (Array.isArray(e.diets)) {
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
        action.payload === "All"
          ? all
          : action.payload === "My Recipes"
          ? all.filter((e) => e.createdInDb)
          : all.filter((e) => !e.createdInDb);
      return {
        ...state,
        recipes: originFiltered,
      };
    case SORT_BY_NAME:
      const sortedName =
        action.payload === "Asc"
          ? state.recipes.sort((a, b) => a.name.localeCompare(b.name))
          : state.recipes.sort((a, b) => b.name.localeCompare(a.name));
      return {
        ...state,
        recipes: sortedName,
      };
    case SORT_BY_SCORE:
      const sortedScore =
        action.payload === "Asc"
          ? state.recipes.sort((a, b) => a.score - b.score)
          : state.recipes.sort((a, b) => b.score - a.score);
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
        recipes: [...state.recipes, action.payload],
      };
    default:
      return state;
  }
}

export default rootReducer;
