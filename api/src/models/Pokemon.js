const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    life: {
      type: DataTypes.INTEGER
    },
    attack: {
      type: DataTypes.INTEGER
    },
    defense: {
      type: DataTypes.INTEGER
    },
    speed: {
      type: DataTypes.INTEGER
    },
    height: {
      type: DataTypes.FLOAT
    },
    weight: {
      type: DataTypes.FLOAT
    },
    image: {  
      type: DataTypes.STRING,
      allowNull: false
    },
    skills:{
      type: DataTypes.STRING
    },
    description:{
      type: DataTypes.STRING
    },
    descriptionType:{
      type: DataTypes.STRING
    },
    evolutionBack:{
      type: DataTypes.STRING
    },
    evolutionNext:{
      type: DataTypes.STRING
    },
    colorPoke:{
      type: DataTypes.STRING
    }
  });
};
