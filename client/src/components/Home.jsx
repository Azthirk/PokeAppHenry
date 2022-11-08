import "./Styles/home.css";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getType, pageBack } from "../redux/actions/index.js";
import { Link } from "react-router-dom";
import CardPokemon from "./CardPokemon.jsx";
import Paginado from "./Paginado.jsx";
import Loading from "./Loading.jsx";
import unknow from "../sourceImg/unknow.png";

export default function Home() {
  document.body.style = `background-image: radial-gradient(circle at 50% 7.34%, #5989ff 0, #004ba0 50%, #001443 100%)`;
  //Obtengo los datos de los Pokemons
  const dispatch = useDispatch();
  var pokemons = useSelector((state) => state.pokemons);
  var allPokemons = useSelector((state) => state.allPokemons);
  var pagBack = useSelector((state) => state.pageBack);
  
  useEffect(() => {
      if(pokemons.length === 0){
        dispatch(getType());
        dispatch(getPokemons());
        dispatch(pageBack(1));
      }
      // eslint-disable-next-line
  }, [dispatch]);

  //Paginado
  var [pageActual, totalPage] = useState(1);
  var pokemonsForPage = pokemons.slice(((pageActual * 12) - 12), (pageActual * 12));
  if(pagBack !== pageActual)pokemonsForPage = pokemons.slice(( ((pagBack * 12) - 12 )), (pagBack * 12));
  pageActual = pagBack

  const pags = (i) => {
    totalPage(i);
    dispatch(pageBack(i));
  };  

    return (
      <div className="home">
        {pokemons.length === 0 && allPokemons.length === 0 ?  <Loading/> : ""}
        {pokemons.length === 0 && allPokemons.length !== 0 ? <div className="cargandoResults">
          <div><img src={unknow} alt="imgType" width="120px" height="120px"/></div>
          <p>No matches found</p>
        </div> : ""}
        
        <div className="cardContainer">
          {pokemonsForPage.map((e) => {
              return (
                  <Link to={"/home/" + e.id} key={e.id}>
                    <CardPokemon
                      id={e.id}
                      name={e.name}
                      image={e.image}
                      types={e.types}
                    />
                  </Link>
              );
            })
          }

        </div>

        {pokemons.length > 1 ?
        <div className="ContenedorPaginado">
          {pageActual !== 1 ? <button className="btnx" onClick={() => pags(pageActual - 1)}> Back </button> : <button className="btnx" style={{visibility: "hidden"}}> Back </button>}
          <Paginado
            allPokemons={pokemons.length}
            pags={pags}
          />
          {pageActual !== Math.ceil(pokemons.length / 12) ? <button className="btnx" onClick={() => pags(pageActual + 1)}> Next </button> : <button className="btnx" style={{visibility: "hidden"}}> Next </button>}
        </div>: ""}

      </div>


    );
  }




