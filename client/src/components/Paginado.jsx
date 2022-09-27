import React from "react";
import "./Styles/Paginado.css"

export default function Paginado({ allPokemons, pags }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / 12); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='paginado' >
        {pageNumbers && pageNumbers.map(number => {
             return (<div className="number" key ={number}>
                <button className="btn" onClick={() => pags(number)}> {number} </button>
            </div>)
          })
        }
      </ul>
    </nav>
  );
}

