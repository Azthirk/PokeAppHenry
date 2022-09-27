import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom";
import { getType, postPokemon, resetPagePost} from "../redux/actions/index.js";
import imageLogo2 from "../sourceImg/mew.png"
import { Link } from "react-router-dom";
import "./Styles/Create.css";

var errors = {};

function validate(pokemon){
  errors.name = "A name is required";
  errors.life = "A life is required";
  errors.attack = "A attack is required";
  errors.defense = "A defense is required";
  errors.speed = "A speed is required";
  errors.height = "A height is required";
  errors.weight = "A weight is required";
  errors.skills = "A skills is required";
  errors.description = "A description is required";
  errors.types = "A types is required";

  if (pokemon.name) delete errors.name;
  if (pokemon.life) delete errors.life;
  if (pokemon.attack) delete errors.attack;
  if (pokemon.defense) delete errors.defense;
  if (pokemon.speed) delete errors.speed;
  if (pokemon.height) delete errors.height;
  if (pokemon.weight) delete errors.weight;
  if (pokemon.skills) delete errors.skills;
  if (pokemon.description) delete errors.description;

  return errors;
}

function typeValidate(eligio){
  if (eligio === true) delete errors.types;
  return errors;
}

export default function Create() {
document.body.style = `background-image: radial-gradient(circle at 50% -20.71%, #7795f8 0, #38508a 50%, #07132a 100%)`;
const dispatch = useDispatch();
const history = useHistory();
const types = useSelector((state) => state.types);

useEffect(() => {
  dispatch(getType());
}, [dispatch]);

const [errors,setErrors] = useState({});

const [pokemon, setPokemon] = useState({
  name: "",
  types: [],
  image: "",
  life: "",
  attack: "",
  defense: "",
  speed: "",
  height: "",
  weight: "",
  skills: "",
  description:""
});

function handleSelect(e) {
  typeValidate(true);
  if(pokemon.types.length > 1){
    alert("Max 2 types!");
  }else{
    setPokemon({
      ...pokemon,
      types: [...pokemon.types, e.target.value],
    });
  }
}

function onInputChange(e) {
  e.preventDefault();
  setPokemon({
    ...pokemon,
    [e.target.name]: e.target.value,
  });
  setErrors(
    validate({
      ...pokemon,
      [e.target.name]: e.target.value,
    })
  );
}

function onSubmit(e) {
  e.preventDefault();

  if(Object.entries(errors).length !== 0){
    alert("Please complete all fields!");
  }else{
    dispatch(postPokemon(pokemon));
    alert("Successfully created character!");
    setPokemon({pokemon});
    history.push("/home");
    dispatch(resetPagePost());
  } 

}

return (
    <div>
      <div className="containerLandingGeneralForm">
        <div className="imagenMew">
          <img src={imageLogo2} alt="Mewtwo" width="450px" height="450px"/>
        </div>

        <form className="form" onSubmit={onSubmit}>
          <h3 className="title"> Create your pokemon!</h3>

          <div className="formInputs">
            <div className="divFormInputs">
              {/* Input Name */}
              <span> Name </span>
              <input onChange={onInputChange} id="name" name="name" type="text" value={pokemon.name} className="input"
                required placeholder="Name..."/>
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div className="divFormInputs">
              {/* Input Vida */}
              <span> HP </span>
              <input onChange={onInputChange} name="life" type="number" value={pokemon.life} className="input"
                required placeholder="HP..."/>
              {errors.life && <p className="error">{errors.life}</p>}
            </div>
          </div>

          <div className="formInputs">
            <div className="divFormInputs">          
              {/* Input Fuerza */}
              <span> Force </span>
              <input onChange={onInputChange} name="attack" type="number" value={pokemon.attack} className="input"
                required placeholder="Force..."/>
              {errors.attack && <p className="error">{errors.attack}</p>}
            </div>

            <div className="divFormInputs">
              {/* Input Defensa */}
              <span> Defense </span>
              <input onChange={onInputChange} name="defense" type="number" value={pokemon.defense} className="input"
                required placeholder="Defense..."/>
              {errors.defense && <p className="error">{errors.defense}</p>}
            </div>
          </div>
          
          <div className="formInputs">
            <div className="divFormInputs">
              {/* Input Velocidad */}
              <span> Speed </span>
              <input onChange={onInputChange} name="speed" type="number" value={pokemon.speed} className="input"
                required placeholder="Speed..."/>
              {errors.speed && <p className="error">{errors.speed}</p>}
            </div>

            <div className="divFormInputs">
              {/* Input Altura */}
              <span> Height </span>
              <input onChange={onInputChange} name="height" type="number" value={pokemon.height} className="input"
                required placeholder="Height..."/>
              {errors.height && <p className="error">{errors.height}</p>}
            </div>
          </div>

          <div className="formInputs">
            <div className="divFormInputs">
              {/* Input Peso */}
              <span> Weight </span>
              <input onChange={onInputChange} name="weight" type="number" value={pokemon.weight} className="input"
                required placeholder="Weight..."/>
              {errors.weight && <p className="error">{errors.weight}</p>}
            </div>

            <div className="divFormInputs">
              {/* Input Habilidades */}
              <span> Skills </span>
              <input onChange={onInputChange} name="skills" type="string" value={pokemon.skills} className="input"
                required placeholder="Skills..."/>
              {errors.skills && <p className="error">{errors.skills}</p>}
            </div>
          </div>

          <div className="formInputs">
            <div className="divFormInputs">
              {/* Input Descripcion */}
              <span> Description </span>
              <input onChange={onInputChange} name="description" type="string" value={pokemon.description} className="input"
                required placeholder="Description..."/>
              {errors.description && <p className="error">{errors.description}</p>}
            </div>
            <div className="divFormInputs">
              {/* Input Image */}
              <span> Image URL (Optional) </span>
              <input onChange={onInputChange} name="image" type="string" value={pokemon.image} className="input"
               placeholder="YourURL..."/>
            </div>
          </div>

          <div className="types">
            {/* Option Tipo */}
            <select onChange={handleSelect}>
              <option value="type"> Types </option>
                {types.map((e) => (
                  <option  value={e.name} key={e.name}>{e.name[0].toUpperCase() + e.name.slice(1)}</option>
                ))}
            </select>

              <p>{pokemon.types[0] ? pokemon.types[0][0].toUpperCase() + pokemon.types[0].slice(1) : ""}</p>
              <p>{pokemon.types[1] ? " / " + pokemon.types[1][0].toUpperCase() + pokemon.types[1].slice(1) : ""}</p>

            </div>


          {/* Boton crear */}
          <Link to="/home" > 
            <button className="bottoms">Cancel</button>
          </Link> 
          <button type="submit" className="bottoms">Create</button>
        </form>

      </div>
    </div>
  );
}

