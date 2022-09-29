import React from "react";
import { Link } from "react-router-dom";
import "./Styles/LandingPage.css";
import imageLogo from "../sourceImg/LogoPokemon2.png"
import imageLogo2 from "../sourceImg/mewtwo.png"
export default function LandingPage() {
  document.body.style = `background-image: radial-gradient(circle at 50% 7.34%, #5989ff 0, #004ba0 50%, #001443 100%)`;

  return (
      <div className="containerLandingGeneral">
        <div className="containerLanding">
          <img src={imageLogo} alt="Logo" width="400px" height="205px"/>
          <div className="texto">
            <p>Welcome to the PokeApp, in it you can see the various existing Pokemons and you can also create one!</p>
          </div>
          <div>
            <Link to="/home">
              <button className="buttonx" ><span>GO!</span></button>
            </Link>
          </div>
        </div>

        <div className="containerMewtwo">
          <img src={imageLogo2} alt="Mewtwo" width="450px" height="450px"/>
        </div>
        
      </div>
  )
}

