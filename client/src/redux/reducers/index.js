import { GET_POKEMONS, GET_DETAILS, GET_TYPE, FILTER_TYPE, FILTER_CREATED, FILTER_ATTACK, 
SORT, SEARCH_NAME, POST_POKEMON, RESET_DETAIL, RESET_PAGE, PAGE_BACK, RESET_PAGE_POST } from "../actions";

const initialState = {
  allPokemons: [],
  pokemons: [],
  detail: null,
  types: [],
  pageBack: 1
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS: return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload
      };

    case GET_DETAILS: return {
          ...state,
          detail: action.payload
        };
  
    case GET_TYPE: return {
          ...state,
          types: action.payload
        };
  
    case FILTER_TYPE:
      const allPokemonsx = state.allPokemons;
      const typeFiltered = action.payload === "TYPE"
          ? allPokemonsx : allPokemonsx.filter((e) => 
          typeof e.types[0] === "object" && e.types.length > 1 ? e.types[0].name === action.payload || e.types[1].name === action.payload:
          typeof e.types[0] === "object" && e.types.length === 1 ? e.types[0].name === action.payload:
          e.types.includes(action.payload)
          );
      return {
        ...state,
        pokemons: typeFiltered
      };

    case FILTER_CREATED:
      const createdFilter =
        action.payload === "CREATE"
          ? state.allPokemons.filter((e) => e.id.length > 5)
          : state.allPokemons.filter((e) => e.id.length === undefined);
      return {
        ...state,
        pokemons: action.payload === "ALL" ? state.allPokemons : createdFilter
      };

    case FILTER_ATTACK:
        let attackFilter = [...state.pokemons];
        attackFilter = attackFilter.sort((a, b) => {
          if(action.payload === "HIGHFORCE") if (a.attack > b.attack) return - 1;
          if(action.payload === "LOWERFORCE") if (a.attack < b.attack) return - 1;
          return 0;
        });
        return {
          ...state,
          pokemons: action.payload === "FORCE" ? state.allPokemons : attackFilter
     };

    case SEARCH_NAME: return {
        ...state,
        pokemons: action.payload 
    };
    case SORT:
      let orderedCharacters = [...state.pokemons];
      orderedCharacters = orderedCharacters.sort((a, b) => {
        if(action.payload === "UPWARD") if (a.name < b.name) return - 1;
        if(action.payload === "FALLING") if (a.name > b.name) return - 1;
        return 0;
      });
      return {
        ...state,
        pokemons: action.payload === "FILTER" ? state.allPokemons : orderedCharacters
    };

    case POST_POKEMON:
        return {
          ...state,
          allPokemons: state.pokemons
    };

    case RESET_DETAIL:return {
      ...state,
      detail: null
    }
    case RESET_PAGE:return {
      ...state,
      pokemons: state.allPokemons,
      pageBack: 1
    }

    case RESET_PAGE_POST: return {
      ...state,
      pokemons: []
    }

    case PAGE_BACK:return {
      ...state,
      pageBack: action.payload
    }
    default: return state;
  }
}

export default rootReducer;
