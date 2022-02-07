
//  Paginado para ir buscando y mostrando las siguientes recetas, 9 recetas por pagina, mostrando las primeros 9 en la primer pagina.

import React from 'react';
import '../styles/Paginado.css'


export default function Paginado({recipesPerPage, allRecipes, paginado}) {
    const pageNumbers = [];

    for(let i=0; i < Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i+1);
    }

    return (
        <nav>
            <ul className="paginado">
                {pageNumbers.length > 1 &&
                pageNumbers.map(number => (
                    <li key={number}>
                        <button onClick={() => paginado(number)}><strong>{number}</strong></button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
