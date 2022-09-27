const { Pokemon, Type} = require("../db.js");

const InfoDataBase = async () => {
      const results = await Pokemon.findAll({
          include:{
              model: Type,
              attributes: ['name'],
              through:{
                  attributes: [],
              }
          }
      })
      return results;
} 


module.exports = InfoDataBase;