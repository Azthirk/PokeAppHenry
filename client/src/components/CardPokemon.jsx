import React from "react";
import "./Styles/CardPokemon.css";
import * as Images from "./sourcesComponents/images.jsx";
import * as Colors from "./sourcesComponents/colors.jsx";
import image2 from "../sourceImg/pikachu.png";
export default function CardPokemon({ name, types, image, id }) {

  var imgType;
  var imgType2;
  var backColor;

Images.ArrayImg.forEach(i => {
    if(typeof types[0] === 'object'){
      if(i.name === types[0].name) imgType = i.img;
      if(types.length  > 1 && types[1].name){
        if(i.name === types[1].name) imgType2 = i.img;
      }
    }else{
      if(i.name === types[0]) imgType = i.img;
      if(types[1]){
        if(i.name === types[1]) imgType2 = i.img;
      }
    }
});

Colors.ArrayColor.forEach(i => {
  if(typeof types[0] === 'object'){
    if(i.name === types[0].name) backColor = i.backColor;
  }else{
      if(i.name === types[0]) backColor = i.backColor;
  }
});

function validURL(str) {
  let a  = document.createElement('a');
  a.href = str;
  if (a.host && a.host !== window.location.host){
    return true;
  }
  return false;
}

return (
    <div id="intro" className = 'stylesCard' style={{background: backColor}}>

      <p> #{
      id < 10 ? "00" + id :
      id >= 10 && id < 100 ? "0" + id :
      id.length > 5 ? "DataBase"
      : id} </p>

      <h3 className="name"> {name.charAt(0).toUpperCase() + name.slice(1)}</h3>

      <div className="iconsType">
        <div>
          <img src={imgType} alt="imgType" width="40px" height="40px"/>
        </div>
        {types[1] ? <img src={imgType2} alt="imgType2" width="40px" height="40px"/> : ""}
      </div>

      {!validURL(image) && id.length > 5 ? <img src={image2} alt="imagen" width="120px" height="120px"/> 
      : <img src={image} alt="imagen" width="120px" height="120px"/>}

      <p>
        {typeof types[0] === 'object' ? types[0].name[0].toUpperCase() + types[0].name.slice(1) : types[0][0].toUpperCase() + types[0].slice(1)}
        {types.length > 1 && typeof types[0] === 'object'? " - " + types[1].name[0].toUpperCase() + types[1].name.slice(1) : ""}
        {types[1] && !types[1].name ? " - " + types[1][0].toUpperCase() + types[1].slice(1) : ""}
      </p>

    </div>
    
  );
}
