const { Router } = require("express");
const axios = require("axios");
const { Type } = require("../db.js");
const router = Router();

router.get("/", async (req, res) => {
    
    try {
        const api = await axios.get("https://pokeapi.co/api/v2/type");
        for (tipoActual of api.data.results) {
            const find = await Type.findOne({ where: {name: tipoActual.name}});
            if (!find) await Type.create({ name: tipoActual.name }); //Lo agrego
        }
      res.json(await Type.findAll()); //Devuelvo todos los tipos de la base de atos.
    } catch (error) {
      res.send(error);
    }
  });

module.exports = router;