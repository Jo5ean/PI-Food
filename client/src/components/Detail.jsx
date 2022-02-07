// Ruta de detalle de receta: debe contener

// [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
// [ ] Resumen del plato
// [ ] Puntuación
// [ ] Nivel de "comida saludable"
// [ ] Paso a paso

import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from '../redux/actions';
import '../styles/Detail.css';

export default function Detail(props) {
    const dispatch = useDispatch();
    const id = props.match.params.id; //aacedemos al id que viene por la url

    const detail = useSelector(state => state.detail);

    useEffect(() => {
        dispatch(getDetails(id));
    } , [dispatch, id]); //cosultar por el doble argumento 

    return (
        <div className="detail">
            <Link to ='/home'><button className="detail__button" id='aCasa'>Volver</button></Link>
            <Link to ='/form'><button className="detail__button">Crea una Receta</button></Link>
            {
                detail.length > 0 ?
                <div>
                    <h1 className="name">{detail[0].name}</h1>
                    <ul className="asd">
                        <li>
                        <div>
                            <img className="detail__image" src={detail[0].image} alt={detail[0].name}/>
                        </div>
                        </li>
                        <li>
                            <div>
                                <h3 className='caracts'>Dietas:</h3>
                                <ul className="detail__list">
                                    {/* analizar cambio de codig, logica medio rara */}
                                    { detail[0].createdInDb?
                                        detail[0].diet.map(e => {
                                            return <li key={e.id}>{e.name}</li>
                                        }) :
                                        detail[0].diet?
                                        detail[0].diet.map(e => {
                                            return <li key={e.id}>{e.name}</li>
                                        }) :
                                        <li>No hay dietas</li>
                                    }
                                </ul>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h3 className='caracts'>Resumen del plato:</h3>
                                <p className="detail__text">{detail[0].summary}</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h3 className='caracts'>Puntuación:</h3>
                                <p className="detail__text">{detail[0].spoonocularScore}</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h3 className='caracts'>Nivel de "comida saludable":</h3>
                                <p className="detail__text">{detail[0].healthScore}</p>
                            </div>
                        </li> 
                        <li>
                            <div>
                                <h3 className='caracts'>Paso a paso:</h3>
                                <p className="detail__text">{detail[0].analyzedInstructions}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                : <div className="loading">
                    <h1><strong>Cooking..</strong></h1>
                </div>
            }
        </div>
    );
}
