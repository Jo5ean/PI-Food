import React from 'react';
import '../styles/Card.css';

export default function Card ({name, image, diets}){
    return (
        <div className="card">
            <div>
                <h1 className='info'>{name}</h1>
            </div>
            <div>
                <img src={image} alt={`${name}`} className='imageRecipe'/>
            </div>
            <div>
                <h2 className='info'>Diets:</h2>
                <ul>
                    {/* revisar codigo de la siguiente linea */}
                    {diets.map(diet => <li key={diet} className='info'>{diet}</li>)}
                </ul>
            </div>
        </div>
    )
}
