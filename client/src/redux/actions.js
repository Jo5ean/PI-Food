import axios from 'axios';

export const GET_RECIPES ='GET_RECIPES'
export const GET_DIETS ='GET_DIETS'
export const GET_DETAILS ='GET_DETAILS'
export const FILTER_BY_DIET ='FILTER_BY_DIET'
export const FILTER_BY_ORIGIN ='FILTER_BY_ORIGIN'
export const SORT_BY_NAME ='SORT_BY_NAME'
export const SORT_BY_SCORE ='SORT_BY_SCORE'
export const POST_RECIPE ='POST_RECIPE'
export const GET_SCORE = 'GET_SCORE'

//realizamos la coneccion del back con el front con axios
export function getScore(name){
    return async function(dispatch){
        try{
            if(name){
          
                let json  = await axios.get('/recipe/get/', {});
                // console.log(json.data)
                let scorefilt = json.data.filter((e)=>e.aggregateLikes === name)
                return dispatch({
                    type: GET_SCORE,
                    payload: scorefilt,
                    
                })
            }
        } catch(err){
            console.log(err)
        }
    }
}

export function getRecipes(name){
    return async function (dispatch){
        try{
            if(name){
        var ciu  = await axios.get('/recipe/get?name='+name);
        return dispatch({
            type: GET_RECIPES,
            payload: ciu.data
        })
    } else{
        let json  = await axios.get('/recipe/get/', {});
        // console.log(json.data)
        return dispatch({
            type: GET_RECIPES,
            payload: json.data,
            
        })
    }
    }catch(error){
        console.log(error);
}}};

export function getDiets(){
    return async function (dispatch){
        try{
            let json  = await axios.get('/diet/get/types');
            return dispatch({
                type: GET_DIETS,
                payload: json.data
            })
        }catch(error){
            console.log(error);
        }}
}

export function getDetails(id){
    return async function (dispatch){
        try{
            var json = await axios.get('/recipe/get/'+id);
            // console.log(json.data)  
            return dispatch({
                type: GET_DETAILS,
                payload: json.data
            })
        } catch(error){
            console.log(error);
        }
    }
}

export function filterByDiet(payload){
    return {
        type: FILTER_BY_DIET,
        payload
    }
}

export function filterByOrigin(payload){
    return {
        type: FILTER_BY_ORIGIN,
        payload
    }
}

export function sortByName(payload){
    return {
        type: SORT_BY_NAME,
        payload
    }
}

export function sortByScore(payload){
    return {
        type: SORT_BY_SCORE,
        payload
    }
}

//esto nose si va pero por si acaso lo dejamos aca:

export function postRecipe(payload){
    return async function (dispatch){
        try{
            let json = await axios.post('/recipe/post', payload);
            return dispatch({ //preguntar si solo va un return con la respuesta del post
                type: POST_RECIPE,
                payload: json.data
            })
        } catch(error){
            console.log(error);
        }
    }
}

