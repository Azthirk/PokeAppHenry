const axios = require("axios");

const getDataInfoForArray = async (pokeTo, limitPoke) => {
  const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokeTo}&offset=${limitPoke}`)
  .then((pokeDatos) => {
    return pokeDatos.data.results;
  })
  .then((pokeDatos) => {
     return Promise.all(pokeDatos.map((i) => axios.get(i.url)));
  })
  .then((pokeDatos) => {
     return pokeDatos.map((i) => i.data);
  });

  const pokeInfo = resp.map((i) => {
    return {
      id: i.id,
      name: i.name,
      types: i.types.map((t) => t.type.name), 
      image: i.sprites.other["official-artwork"].front_default,
      life: i.stats[0].base_stat,
      attack: i.stats[1].base_stat,
      defense: i.stats[2].base_stat,
      speed: i.stats[3].base_stat,
      height: i.height,
      weight: i.weight
    };
  });

  return pokeInfo;
};

const DataInfo = async () => {
  const pokeConst = 40;
  const totalPokemons = 251;
  var pokeLimits = 0;
  var infoxtotal = [];
  var test = [];

  for(var i = 0; i < 6; i++){
    infoxtotal[i] = await getDataInfoForArray(pokeConst, pokeLimits);
    pokeLimits += pokeConst;
    test = [...test, ...infoxtotal[i]];
  }

  if(totalPokemons - pokeLimits !== 0){
    infoxtotal[i] = await getDataInfoForArray((totalPokemons - pokeLimits), pokeLimits);
    test = [...test, ...infoxtotal[i]];
  }

  return test;
};
  
module.exports = DataInfo;