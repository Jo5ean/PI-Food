import React from 'react';
import '../styles/Card.css';

export default function Card(props) {
    // console.log(props);
    
    // if(props.dietDb){
    // let dietas = props.dietDb.map(e=> e.name);
    // console.log(dietas);
    // }

    

    return (
        <div className="card">
            <div>
                <h1 className='info'>{props.name}</h1>
            </div>
            <div>
                <img src={props.image} alt={`${props.name}`} className='imageRecipe' />
            </div>
            <div>
                <h2 className='info'>Diets:</h2>
                <ul>
                    {/* revisar codigo de la siguiente linea */}
                    {props.dietDb ?
                        props.dietDb.map(e => {
                            return <li key={e.id}>{e.name}</li>
                        } ) : props.diets?.map(e=>{ return <li key={e.id}>{e}</li>})
                    }
                    {/* {diets.map(e=>{ return <li key={e.id}>{e}</li>})} */}
                </ul>

            </div>
        </div>
    )
}