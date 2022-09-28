import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, resetDetail } from "../redux/actions/index.js";
import { Link } from "react-router-dom";
import * as Images from "./sourcesComponents/images.jsx";
import * as Colors from "./sourcesComponents/colors.jsx";
import image2 from "../sourceImg/pikachu.png";
import Stats from "./Stats.jsx";
import "./Styles/Detail.css";
import imagenBack from "../sourceImg/arrow-left.svg";
import imagenBack2 from "../sourceImg/arrow-right.svg";
import Loading from "./Loading.jsx";

export default function Detail(pokeId) {
const dispatch = useDispatch();
var details = useSelector((state) => state.detail);


useEffect(() => {
  dispatch(getDetail(pokeId.match.params.id));
    // eslint-disable-next-line
  return () => {
    dispatch(resetDetail());
  }
    // eslint-disable-next-line
}, [dispatch]);

function setColor(pokemon){
  var backColor;
  Colors.ArrayColor.forEach(i => {
    if(pokemon.types[0].name){
      if(i.name === pokemon.types[0].name) backColor = i.backColor;
    }else{
      if(i.name === pokemon.types[0]) backColor = i.backColor;
    }
  });
  document.body.style = `background-image: ${backColor}`;
}

function setType1(pokemon){
  var imgType;
  Images.ArrayImg.forEach(i => {
    if(typeof pokemon.types[0] === 'object'){
      if(i.name === pokemon.types[0].name) imgType = i.img;
    }else{
      if(i.name === pokemon.types[0]) imgType = i.img;
    }
  });
  return imgType;
}

function setType2(pokemon){
  var imgType2;
  Images.ArrayImg.forEach(i => {
    if(typeof pokemon.types[0] === 'object'){
        if(i.name === pokemon.types[1].name) imgType2 = i.img;
    }else{
        if(i.name === pokemon.types[1]) imgType2 = i.img;
    }
  });
  return imgType2;
}

function getDescription(p){
  if(p.id.length > 5)return "";
    return(
      p.name.charAt(0).toUpperCase() + p.name.slice(1)  + " is the "  + p.descriptionType.toLowerCase() +
      ". " + p.name.charAt(0).toUpperCase() + p.name.slice(1) + " are of type/s " + p.types.join(" ") + " and color "
      + p.colorPoke + "."
    );
}

function validURL(str) {
  let a  = document.createElement('a');
  a.href = str;
  if (a.host && a.host !== window.location.host){
    return true;
  }
  return false;
}
console.log(details);

  return (
        <div>
        {!details? <Loading/> : ""}
        {details && details.map(p => (
          
        <div id={p.id} key={p.id} className="container">
          {setColor(p)}
          
          <div className="headerDetail">
            <p> #{
            p.id < 10 ? "00" + p.id :
            p.id >= 10 && p.id < 100 ? "0" + p.id :
            p.id.length > 5 ? "DataBase"
            : p.id} </p>
            <h1 className="name"> {p.name.charAt(0).toUpperCase() + p.name.slice(1)}</h1>

            <Link to="/home" > 
              <img src={imagenBack} alt="imgType" width="64px" height="64px"/> 
            </Link> 
          </div>

         <div className="pokeInfo">
            {!validURL(p.image) && p.id.length > 5? <img src={image2} alt="imagen" width="256px" height="256px"/> 
            : <img src={p.image} alt="imagen" width="256px" height="256px"/>}

            <div className="infoContent">

              <div className="stats">
                  <h2>Skills</h2>
                  <div >
                    <Stats valor={p.life} name={"HP"}/>
                    <Stats valor={p.attack} name={"Attack"}/>
                  </div>

                  <div>
                    <Stats valor={p.defense} name={"Defense"}/>
                    <Stats valor={p.speed} name={"Speed"}/>
                  </div>
              </div>
            </div>
         </div>
              
            <div className="pokeInfo2">
              <div><img src={setType1(p)} alt="imgType" width="64px" height="64px"/></div>
              {p.types[1] ? <img src={setType2(p)} alt="imgType2" width="64px" height="64px"/> : ""}
            </div>

            <p>Type/s: {typeof p.types[0] === 'object' ? p.types[0].name[0].toUpperCase() + p.types[0].name.slice(1) : p.types[0][0].toUpperCase() + p.types[0].slice(1)}
              {p.types.length > 1 && typeof p.types[0] === 'object'? " - " + p.types[1].name[0].toUpperCase() + p.types[1].name.slice(1) : ""}
              {p.types[1] && !p.types[1].name ? " - " + p.types[1][0].toUpperCase() + p.types[1].slice(1) : ""}
            </p>

            <div className="descriptionPokemon">
              <h2>Description</h2>
              <p>{getDescription(p)}</p>
              <p>{p.description}</p>
            </div>
            
            <div className="infoContent">
                <div className="dates">
                  <h2>Data</h2>
                  <p>Height: {p.height / 10} m</p>
                  <p>Weight: {p.weight / 10 } kg</p>
                </div>

                <div className="skills">
                  <h2>Abilities</h2>
                  {p.skills.length > 1 && p.id.length < 5? <div>
                    <p>{"1: " + p.skills[0][0].toUpperCase() + p.skills[0].slice(1)}</p>
                    <p>{"2: " + p.skills[1][0].toUpperCase() + p.skills[1].slice(1)}</p>
                  </div>: p.id.length > 5 ? "1: " + p.skills[0].toUpperCase() + p.skills.slice(1) :
                  "1: " + p.skills[0][0].toUpperCase() + p.skills[0].slice(1)}
                </div>
            </div>

            {p.evolutionNext?
            <div><h2>Evolutions</h2>
              <div className="pokeInfo">
                <div><img src={p.image} alt="imgActual" width="128px" height="128px"/><p>{p.name[0].toUpperCase() + p.name.slice(1)}</p></div>
                <div><img src={imagenBack2} alt="imgActualb" width="48px" height="48px"/></div>
                <div><img src={p.evolutionNext[0].image} alt="imgEvoNext" width="128px" height="128px"/><p>{p.evolutionNext[0].name[0].toUpperCase() + p.evolutionNext[0].name.slice(1)}</p></div>
                
              </div>
            </div>:""}

            </div>
          ))}

        </div>
    
  );
}
