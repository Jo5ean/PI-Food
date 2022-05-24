// Ruta de detalle de receta: debe contener

// [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
// [ ] Resumen del plato
// [ ] Puntuación
// [ ] Nivel de "comida saludable"
// [ ] Paso a paso

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from '../redux/actions';
import '../styles/Detail.css';
import { useParams } from "react-router";

export default function Detail() {
    let { id: code } = useParams();
    let [id] = useState(code);
    // console.log(id);
    const dispatch = useDispatch();

    //debugger;
    // console.log(this.props.params);

    // const id = this.props.match.params.id;
    // console.log(id);

    useEffect(() => {
        dispatch(getDetails(id));
    }, [dispatch, id]); //cosultar por el doble argumento 

    const detail = useSelector(state => state.details);
    console.log(detail);
    // console.log(detail[0].summary.innerHTML);
    //    console.log(detail[0].summary);
    return (
        <div className="fondo">
            <div className="detail-header">
            <Link to='/home'><button className="detail_button" id='aCasa'>Volver</button></Link>
            <Link to='/form'><button className="detail_button">Crea una Receta</button></Link>
            {
                detail.length > 0 ?
                    <div className="separar">
                        <h1 className="name">{detail[0].name}</h1>

                        <div className="mar">
                            <div>
                                <img className="detail_image" src={detail[0].image} alt={detail[0].name} />
                            </div>
                            <div className='caracts'>
                                <h3 >Resumen del plato:</h3>
                                <div dangerouslySetInnerHTML={{ __html: detail[0].summary }} />
                            </div>

                        </div>

                        <ul className="asd">
                            <li>
                                <div>
                                    <h3 className='caracts'>Dietas:</h3>
                                    <ul className="detail__list">
                                        {/* analizar cambio de codig, logica medio rara */}
                                        {detail[0].createInDb ?
                                            detail[0].diets.map(e => {
                                                return <li key={e.id}>{e.name}</li>
                                            }) :
                                            detail[0].diet ?
                                                detail[0].diet.map(e => {
                                                    return <li key={e.id}>{e}</li>
                                                }) :
                                                <li>No hay dietas</li>
                                        }
                                    </ul>
                                </div>
                            </li>

                            <li>
                                <div>
                                    <h3 className='caracts'>Puntuación:</h3>
                                    <p className="detail__text"><strong>{detail[0].spoonacularScore}</strong></p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h3 className='caracts'>Nivel de "comida saludable":</h3>
                                    <p className="detail__text"><strong>{detail[0].healthScore}</strong></p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h3 className='caracts'>Paso a paso:</h3>
                                    {detail[0].createInDb ? <p className="detail__text">{detail[0].steps}</p> :
                                        <p className="last"><strong>{detail[0].analyzedInstructions}</strong></p>
                                    }
                                </div>
                            </li>
                        </ul>
                    </div>
                    : <div className="loading">
                        <h1><strong>Cooking..</strong></h1>
                    </div>
            }
        </div>
        </div>
    );
}
