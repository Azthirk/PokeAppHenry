import React from 'react';
// import Logo from '../img/logoHenry.png'
import './Styles/HeaderNav.css';
import { Link } from "react-router-dom";
import Logo from '../sourceImg/LogoPokemon.png';
import SearchBar from './SearchBar.jsx';
export default function Nav(onSearch) {

  return (
    <div className="header">
        <Link to="/">
          <div className='imgLogox'>
            <img src={Logo} alt="imgType" width="125px" height="50px"/>
          </div>
        </Link>
        <SearchBar
        id="barrita"
          onSearch={onSearch}
        />
        <Link to="/create" style={{ textDecoration: 'none' }}>
              <button className="addPokemon"><p>+ ADD POKEMON</p></button>
        </Link>
    </div>
  );
};

