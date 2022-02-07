import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipes } from "../redux/actions";
import '../styles/SearchBar.css';

export default function SearchBar() {

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setName(e.target.value); //event handler for input
    }

    function handlesubmit(e) {
        e.preventDefault();
        dispatch(getRecipes(name)); //probablemente tenga que declarar una variable y meter el getrecipes en ella
        setName('');
    }

    return (
        <div className="search-bar">
            <input
                type='text'
                placeholder='Search for a recipe..'
                onChange={e => handleChange(e)}
                value={name}
                className="input"
                onKeyPress={e => { if (e.key === 'Enter') handlesubmit(e) }}
            />
            <button
                className="button"
                type="submit"
                onClick={e => handlesubmit(e)}
            >
                <strong>Taste!</strong>
            </button>
        </div>
    )
}


