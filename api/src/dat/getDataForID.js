const axios = require("axios");
const InfoDataBase = require("../dat/getDataBase");
const getDataForName = require("../dat/getDataForName");



const DataForID = async (id) => {
    var contador = 0;
    const dataBase = await InfoDataBase();
    const pokemonData = dataBase.filter((i) => i.id === id);
    if(pokemonData.length > 0) return pokemonData;

    const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${1}&offset=${id - 1}`)
    .then((pokeDatos) => {
      return pokeDatos.data.results;
    })
    .then((pokeDatos) => {
       return Promise.all(pokeDatos.map((i) => axios.get(i.url)));
    })
    .then((pokeDatos) => {
       return pokeDatos.map((i) => i.data);
    });

    if(resp.length === 0 ) return null; //Si no hay info, retorno null

    const desc = await axios.get(resp[0].species.url).then((pokeDatos) => {
      return pokeDatos.data;
    })
    const evolution = await axios.get(desc.evolution_chain.url).then((pokeDatos) => {
      return pokeDatos.data;
    })

    var evolutions = [];
    
    if(evolution.chain.species){
      evolutions.push(evolution.chain.species);
      if(evolution.chain.evolves_to.length > 0){
        evolutions.push(evolution.chain.evolves_to[0].species);
        if(evolution.chain.evolves_to[0].evolves_to.length > 0){
          evolutions.push(evolution.chain.evolves_to[0].evolves_to[0].species);
        } 
      }
    } 
    
    var nextE = null;
    var backE = null;

    for(let i = 0; i < evolutions.length; i++){
      if(evolutions[i].name === resp[0].name && evolutions[i + 1] !== undefined){
        nextE = await getDataForName(evolutions[i + 1].name);
      }
    } 

    for(let i = 0; i < evolutions.length; i++){
      if(evolutions[i].name === resp[0].name &&  evolutions[i - 1] !== undefined){
        backE = await getDataForName(evolutions[i - 1].name);
      }
    } 

    const pokeId = resp.map( (i) => {
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
        weight: i.weight,
        skills: i.abilities.map((t) => t.ability.name),
        description: desc.flavor_text_entries.map(t => {
            if(t.language.name === "en" && contador < 1){
              contador++;
              return t.flavor_text.split('\f');
            }
        }),
        descriptionType: desc.genera[7].genus,
        evolutionBack: backE,
        evolutionNext: nextE,
        colorPoke: desc.color.name
      }
    });
    
    return pokeId;
}

module.exports = DataForID;