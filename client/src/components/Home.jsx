// import { usePaginado } from './Paginado';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipes, getDiets, filterByDiet, filterByOrigin, sortByName, sortByScore } from '../redux/actions';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import '../styles/Home.css';


export default function Home () {
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.recipes); // igual al mapStateToProps, te retorna el estado traido del reducer
    const allDiets = useSelector(state => state.diets); //consultar si es diets o diet (RESULTO, REVISAR EL STORE)

    //REALIZAREMOS EL PAGINADO
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(9); //por consigna nos piden 9 recetas por pagina
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const [, setSort] = useState(''); //estado que utilizaremos para las sorts

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    //traemos los estados de las recetas y las diets cuando montamos la pagina
    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]); //en el segundo parametro va un array donde se encuentra todo de lo que depende el useEffect para ejecutarse

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(getRecipes())
    }

    function handleFilterDiets(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterByDiet(e.target.value))
    }

    function handleFilterOrigin(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterByOrigin(e.target.value))
    }

    function handleSortByName(e) {
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setCurrentPage(1);
        setSort(`Ordenado ${e.target.value}`);
    }

    function handleSortByScore(e) {
        e.preventDefault();
        dispatch(sortByScore(e.target.value));
        setCurrentPage(1);
        setSort(`Ordenado ${e.target.value}`);
    }

//procedemos al renderizado de la pagina
    return (
      <div className="home">
          <div className='divNB'>
              <ul className='navbar'>
                  <li>
                      <button onClick={e=>{ handleClick(e)}} className='elementNB'>Home</button>
                  </li>
                    <li>
                        <Link to='/form' ><button className='elementNB'>Nueva Receta</button></Link>
                    </li>
                    <li className='content-select'>
                        <select onChange={e=>handleSortByName(e)}>
                            <option value="selected" hidden className='elementNB'>Ordenar por nombre:</option>
                            <option value="asc">A - Z</option>
                            <option value="desc">Z - A</option>
                        </select>
                    </li>
                    <li className='content-select'>
                        <select onChange={e=>handleSortByScore(e)}>
                            <option value="selected" hidden>Ordenar por puntaje:</option>
                            <option value="asc">Mejores puntuados</option>
                            <option value="desc">Peores puntuados</option>
                        </select>
                    </li>
                    <li className='content-select'>
                        <select onChange={e=>handleFilterDiets(e)}>
                            <option key={0} value="all">Todas las Dietas</option>
                            {allDiets?.sort(function (a, b) {
                                if(a.name < b.name) return -1;
                                if(a.name > b.name) return 1;
                                return 0;
                            }).map(diet => {
                                return (
                                    // revisar como llegan los datos de diets
                                <option key={diet.name} value={diet.name}>{diet.name}</option>
                                )
                                })}
                        </select>
                    </li>
                    <li className='content-select'>
                        <select onChange={e=>handleFilterOrigin(e)}>
                            <option value='all'>Todas las Recetas</option>
                            <option value='api'>Recetas Existentes</option>
                            <option value='created'>Mis Recetas</option>
                        </select>
                    </li>
                    <li>
                        <SearchBar />
                    </li>
                </ul>
            </div>

            <h1 className='title1'> Hope you enjoy it! </h1>
            <Paginado recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginado={paginado}/>

            <div className='container'>
                {currentRecipes?.map(e => {
                    return (
                        <div key={e.id} className='cardHome'>
                            <Link to={'/home/' + e.id} style={{textDecoration: 'none' }}>
                                <Card
                                name={e.name}
                                image={e.image}
                                dietDb={e.diets}
                                diets={e.diet}
                                key={e.id}
                                />
                            </Link>
                        </div>
                    )
                })
                }
            </div>

            <Paginado recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginado={paginado}/>
            <Link to='/'><button className='welcome'><span>Welcome Page</span></button></Link>
        </div>
    )
} 