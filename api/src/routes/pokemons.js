const { Router } = require("express");
const DataInfo = require("../dat/getData");
const DataForName = require("../dat/getDataForName");
const InfoDataBase = require("../dat/getDataBase");
const DataForID = require("../dat/getDataForID");
const router = Router();
const { Pokemon, Type } = require("../db.js");
const axios = require("axios");
var db = require("../db.js");

router.get("/", async (req, res) => {

  const { name } = req.query;

  try {
    
    if (name) {      
      const pokeName = await DataForName(name.toLowerCase());
      if(!pokeName) return res.status(404).send("El pokemon ingresado no existe");
      res.status(200).send(pokeName);
    }else{
      const dataBase = await InfoDataBase();
      const dataInfo = await DataInfo();
      const pokeInfo = dataBase.concat(dataInfo);
      res.status(200).send(pokeInfo);
    }
    
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", async (req, res) => { //Busqueda por id
  const { id } = req.params;

  try {
    const pokeId = await DataForID(id);
    if(!pokeId) return res.status(404).send("No se encontró el pokemon");
    res.status(200).json(pokeId)
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  const { name, life, attack, defense, image, speed, height, weight, types, skills, description} = req.body;


  try {

    if (!name || !life|| !attack || !defense || !speed|| !height|| !weight || !types || !skills || !description) 
    return res.status(404).send("Faltan enviar datos");

    const dataBase = await InfoDataBase();
    const pokemonData = dataBase.filter((i) => i.name === name);
    if(pokemonData.length > 0) return res.status(404).send("Error!");

    const newPokemon = await Pokemon.create({
      name: name.toLowerCase(),
      image: image,
      life: life,
      attack: attack,
      defense: defense,
      speed: speed,
      height: height,
      weight: weight,
      skills: skills,
      description: description
    });
    
    const dataBaseType = await Promise.all(types.map((i) => {
      return Type.findOne({where:{ name: i}})
    }))

    await newPokemon.setTypes(dataBaseType)

    return res.status(200).send("¡Pokemon creado con exito!");

  } catch (error) {
    res.send(error);
  }
})

router.get("/delete/:id", async (req, res) => {
	const { id } = req.params;
  try{
    const pokeName = await InfoDataBase();
    const searchID = pokeName.filter(e => e.id === id);
    if(!searchID) return res.status(404).send("ERROR");
    await Pokemon.destroy({
      where: {
        id: id
      }
    });
    res.status(200).send("Borrado");
  } catch (error) {
    res.send(error);
  }
});


module.exports = router;