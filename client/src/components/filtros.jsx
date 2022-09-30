import React from "react";
import "./Styles/filtros.css";
import { filterType, filterCreated, Sort, filterAttack, pageBack} from "../redux/actions/index.js";
export default function filtros({dispatchx, typePokemons}){

    function resetFilter(){
      document.getElementById("idAttack").selectedIndex = 0;
      document.getElementById("idAZ").selectedIndex = 0;
    }

    function handleFilterType(e) {
        dispatchx(pageBack(1));
        dispatchx(filterType(e.target.value));
        document.getElementById("idAll").selectedIndex = 0;
        resetFilter();
    }
    
    function handleFilterAttack(e) {
        dispatchx(filterAttack(e.target.value));
        document.getElementById("idAZ").selectedIndex = 0;
    }

    function onSelectsChange(e) {
        dispatchx(Sort(e.target.value));
        document.getElementById("idAttack").selectedIndex = 0;
    }
    
    function handleFilterCreated(e) {
      dispatchx(filterCreated(e.target.value));
      document.getElementById("idTypes").selectedIndex = 0;
      resetFilter();
    }

    return(
        <div className="Filtros">

          <select id="idTypes" onChange={handleFilterType}>
            <option value="TYPE"> Types </option>
            {typePokemons.map((e) => (
            <option value={e.name} key={e.name}>{e.name[0].toUpperCase() + e.name.slice(1)}</option>
          ))}
          </select>

          <select id="idAttack" name="selects" onChange={handleFilterAttack} className="attack" >
            <option value="FORCE"> Attack </option>
            <option value="HIGHFORCE">Max Attack</option>
            <option value="LOWERFORCE">Min Attack</option>
          </select>

          <select id="idAZ" name="select" onChange={onSelectsChange} className="a-z">
            <option value="FILTER"> A-Z </option>
            <option value="UPWARD">Upward</option>
            <option value="FALLING">Falling</option>
          </select>

          <select id="idAll" onChange={handleFilterCreated}>
            <option value="ALL"> All </option>
            <option value="CREATE"> Create </option>
            <option value="EXISTING"> Existing </option>
          </select>
          
        </div>
    );
}