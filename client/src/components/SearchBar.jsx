import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPoke, resetPage} from "../redux/actions/index.js";
import "./Styles/SearchBar.css";
import Search from "../sourceImg/search.svg";
import Reset from "../sourceImg/rotate-cw.svg";
import Filter from "../sourceImg/align-justify.svg";
import Filtros from "./filtros.jsx";
import {useHistory} from "react-router-dom";

export default function SearchBar() {
  const history = useHistory();
  const [name, setName] = useState([])
  const [mostrarComponente, setMostrarComponente] = useState(true);
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  function validar() {
    const input = document.getElementById('Searching');
    if(!input.checkValidity()) return false;
    return true;
  }

  function handleInputChange(i){
    setName(i.target.value);
  };

  function handleSubmit(i){
    i.preventDefault();
    dispatch(resetPage());
    if(validar() === true){
      dispatch(searchPoke(name));
    }else{
      alert("The field is not valid!")
    }
    setName("");
    history.push("/home");
  }

  function handleReset(){
    dispatch(resetPage());
    history.push("/home");
  }
  function handleViewFilter(){
    setMostrarComponente(!mostrarComponente)
  }

  return (
    <div  >
      <div >
        <div className="search">
          
          <button className ="searchButtonB" onClick={handleViewFilter}>
            <img src={Filter} alt="imgType" width="24px" height="24px"/> 
            {mostrarComponente}
          </button>

          <input
            id="Searching"
            className="searchTerm"
            type="text"
            value={name}
            placeholder="Search Pokemon..."
            onChange= {handleInputChange} 
            pattern="^[A-Za-z\s]+$" 
            maxlength="20"
          />

          <button className ="searchButton" type="submit" onClick= {handleSubmit}> 
                <img src={Search} alt="imgType" width="24px" height="24px"/> 
          </button>

          <button className ="searchButtonB" onClick= {handleReset}>
              <img src={Reset} alt="imgType" width="24px" height="24px"/> 
          </button>

        </div>
        <div>
        <div className={mostrarComponente ? "show-element" : null}>
          {mostrarComponente && <Filtros dispatchx = {dispatch} typePokemons = {types}/>}
        </div>
      </div>
      </div>
    </div>
  );
}