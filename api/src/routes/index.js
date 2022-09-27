const { Router } = require('express');
// Importar todos los routers;
const pokemonsRoute = require ('./pokemons.js')
const typesRoute = require ('./types.js')

const router = Router();

// Configurar los routers
router.use('/pokemons', pokemonsRoute);
router.use('/types', typesRoute);

module.exports = router;
