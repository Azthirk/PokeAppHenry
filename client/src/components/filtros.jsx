import React from "react";
import "./Styles/filtros.css";
import { filterType, filterCreated, Sort, filterAttack, pageBack} from "../redux/actions/index.js";

export default function filtros({dispatchx, typePokemons}){

    function handleFilterType(e) {
        dispatchx(pageBack(1));
        dispatchx(filterType(e.target.value));
    }
    
    function handleFilterAttack(e) {
        dispatchx(filterAttack(e.target.value));
    }

    function onSelectsChange(e) {
        dispatchx(Sort(e.target.value));
    }
    
    function handleFilterCreated(e) {
      dispatchx(filterCreated(e.target.value));
    }

    return(
        <div className="Filtros">

          <select onChange={handleFilterType}>
            <option value="TYPE"> Types </option>
            {typePokemons.map((e) => (
            <option value={e.name} key={e.name}>{e.name[0].toUpperCase() + e.name.slice(1)}</option>
          ))}
          </select>

          <select name="selects" onChange={handleFilterAttack} className="attack" >
            <option value="FORCE"> Attack </option>
            <option value="HIGHFORCE">Max Attack</option>
            <option value="LOWERFORCE">Min Attack</option>
          </select>

          <select name="select" onChange={onSelectsChange} className="a-z">
            <option value="FILTER"> A-Z:</option>
            <option value="UPWARD">Upward</option>
            <option value="FALLING">Falling</option>
          </select>

          <select onChange={handleFilterCreated}>
            <option value="ALL"> All </option>
            <option value="CREATE"> Create </option>
            <option value="EXISTING"> Existing </option>
          </select>
          
        </div>
    );
}