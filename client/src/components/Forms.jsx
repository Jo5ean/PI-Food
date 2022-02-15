import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postRecipe, getDiets } from '../redux/actions'
import '../styles/Form.css';

export default function RecipeCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const diets = useSelector(state => state.diets);

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        summary: '',
        spoonacularScore: 0,
        healthScore: 0,
        steps: [],
        image: '',
        diets: []
    });

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    // Creamos una funcion de validacion de errores

    function validate(input) {
        let errors = {};
        if (input.name.length === 0) {
            errors.name = 'Your recipe must have a name!';
        }
        else if (input.name.length > 30) {
            errors.name = 'Your recipe name must be less than 30 characters!';
        }
        else if (!input.summary) {
            errors.summary = 'Your recipe must have a summary!';
        }
        else if (!input.spoonacularScore) {
            errors.spoonacularScore = 'spoonacularScore required!';
        }
        else if (input.spoonacularScore > 100 || input.spoonacularScore < 0) {
            errors.spoonacularScore = 'spoonacularScore must be between 0 and 100!';
        }
        else if (!input.healthScore) {
            errors.healthScore = 'Healthy level required!';
        }
        else if (input.healthScore > 100 || input.healthScore < 0) {
            errors.healthScore = 'Healthy level must be between 0 and 100!';
        }
        else if (!input.steps) {
            errors.steps = 'Your recipe must have at least one step!';
        }
        return errors;
    }

    // Declaramos los handlers para las funcionalidades

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleSelect(e) {
        if (e.target.value !== "Selecctiona una dieta" && !input.diets.includes(e.target.value)) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postRecipe(input))
        alert('Recipe created successfully!');
        setInput({
            name: '',
            summary: '',
            spoonacularScore: 0,
            healthScore: 0,
            steps: [],
            image: '',
            diets: []
        });
        navigate('/home');
    }

    function handleDelete(el) {
        setInput({
            ...input,
            diets: input.diets.filter(diet => diet !== el)
           
        });
        // console.log(typeof(el));
        // console.log(input.diets);
        // console.log(diets);
      
    }

    return (
        <div className='divCreate'>
            <Link to='/home'><button className='buttonHome'>Home</button></Link>
            <h1 className='title'>Create a new recipe</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label><strong>Name: </strong></label>
                    <input type='text' name='name' value={input.name} onChange={e => handleChange(e)} />
                    {errors.name && (<p className='error'>{errors.name}</p>)}
                </div>
                <div>
                    <label><strong>Summary: </strong></label>
                    <textarea  rows="5" cols="40" placeholder="Summary..." type="text" value={input.summary} name="summary" onChange={handleChange} />
                    {errors.summary && (<p className='error'>{errors.summary}</p>)}
                </div>
                <div>
                    <label><strong>spoonacularScore: </strong></label>
                    <input type='number' name='spoonacularScore' value={input.spoonacularScore} onChange={e => handleChange(e)} />
                    {errors.spoonacularScore && (<p className='error'>{errors.spoonacularScore}</p>)}
                </div>
                <div>
                    <label><strong>Healthy Level: </strong></label>
                    <input type='number' name='healthScore' value={input.healthScore} onChange={e => handleChange(e)} />
                    {errors.healthScore && (<p className='error'>{errors.healthScore}</p>)}
                </div>
                <div>
                    <label><strong>Steps: </strong></label>
                    <textarea name='steps' value={input.steps} onChange={e => handleChange(e)} />
                    {errors.steps && (<p className='error'>{errors.steps}</p>)}
                </div>
                <div>
                    <label><strong>Image: </strong></label>
                    <input type='text' name='image' value={input.image} onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label><strong>Diets: </strong></label>
                    <select name='diets' value={input.diets} onChange={e => handleSelect(e)}>
                        <option>Selecctiona la dieta de tu receta:</option>
                        {diets.map(diet => {
                            return (
                                <option key={diet.id} value={diet.name}>{diet.name}</option>
                            )
                        })}
                    </select>
                    {input.diets.map(e => {
                        return (
                            <ul className='allDiets' key={e}>
                                <li>
                                    <p className='diet'><strong>{e}</strong></p>
                                    <button className='x' onClick={()=> handleDelete(e)}>X</button>
                                </li>
                            </ul>
                        )
                    })}
                </div>
                <button type='submit' disabled={Object.keys(errors).length>0 || input.diets.length<1 ? true : false} className='boop'><strong>Create </strong></button>

            </form>

        </div>
    )
}