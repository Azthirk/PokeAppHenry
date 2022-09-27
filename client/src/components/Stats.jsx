import React from "react";
import "./Styles/stats.css"
const Stats = ({valor, name}) => {
  return (
      <div className="stats">{name}: <span> {valor}</span><p><meter
          min="0"
          max="120"
          value={valor}
          low="25"
          high="100"
          optimum="120"
        /> 
        </p>
      </div>
  );
};

export default Stats;
