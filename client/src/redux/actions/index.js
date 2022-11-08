import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_DETAILS = "GET_DETAILS";
export const GET_TYPE = "GET_TYPE";
export const FILTER_TYPE = "FILTER_TYPE";
export const FILTER_CREATED = "FILTER_CREATED";
export const FILTER_ATTACK = "FILTER_ATTACK";
export const FILTER_DEFENSE = "FILTER_DEFENSE";
export const SORT = "SORT";
export const SEARCH_NAME = "SEARCH_NAME";
export const POST_POKEMON = "POST_POKEMON";
export const RESET_DETAIL = "RESET_DETAIL";
export const RESET_PAGE = "RESET_PAGE";
export const PAGE_BACK = "PAGE_BACK";
export const RESET_PAGE_POST = "RESET_PAGE_POST";
export const DELETE_POKEMON = "DELETE_POKEMON";

export const getPokemons = () => async (dispatch) => {
    var json = await axios.get("/pokemons");
    dispatch({
      type: "GET_POKEMONS",
      payload: json.data
    })
}

export const getDetail = (id) => async (dispatch) => {
    var json = await axios.get(`/pokemons/${id}`);
    if(json.data.length === 0) return alert("¡Pokemon not found!");
    return dispatch({
      type: "GET_DETAILS",
      payload: json.data
    })
}

export const deletePokemon = (id) => async (dispatch) => {
  await axios.get(`/pokemons/delete/${id}`);
  return dispatch({
    type: "DELETE_POKEMON"
  })
}

export const resetDetail = () => {
  return {
    type: "RESET_DETAIL"
  }
}

export const resetPage = () => {
  return {
    type: "RESET_PAGE"
  }
}

export const resetPagePost = () => {
  return {
    type: "RESET_PAGE_POST"
  }
}

export const pageBack = (payload) => {
  return {
    type: "PAGE_BACK",
    payload
  };
}

export const getType = () => async (dispatch) => {
    var json = await axios.get("/types");
    return dispatch({
      type: "GET_TYPE",
      payload: json.data
    })
}

export const filterType = (payload) => {
  return {
    type: "FILTER_TYPE",
    payload
  };
}

export const filterCreated = (payload) => {
  return {
    type: "FILTER_CREATED",
    payload
  };
}

export const filterAttack = (payload) => {
  return {
    type: "FILTER_ATTACK",
    payload
  }
}

export const filterDefense = (payload) => {
  return {
    type: "FILTER_DEFENSE",
    payload
  }
}

export const Sort = (order) => {
  return {
      type: "SORT",
      payload: order
  }
}

export const searchPoke = (name) => async (dispatch) => {
      var json = await axios.get("/pokemons?name=" + name) 
      if(json.data.status === 404) return alert("Pokemon not found!");

      return dispatch({
        type: "SEARCH_NAME",
        payload: json.data
      });
};

export const postPokemon = (payload) => async (dispatch) => {
  var json = await axios.post("/pokemons" , payload);
  return dispatch({
    type: "POST_POKEMON",
    payload: json.data
  })
}