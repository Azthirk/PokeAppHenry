import { filterType, filterCreated, filterAttack, Sort, searchPoke, getPokemons, resetDetail } from "../src/redux/actions/index";

describe('Filtros', () => {

  it("El filtro deberia traerme el tipo de Pokemon pasado", () => {
    expect(filterType("flying")).toEqual({
      type: "FILTER_TYPE",
      payload: "flying",
    });
  });

  it("El filtro deberia traerme los tipos de Pokemon creados en la base de datos", () => {
    expect(filterCreated("CREATED")).toEqual({
      type: "FILTER_CREATED",
      payload: "CREATED",
    });
  });

  it("El filtro deberia traerme todos los Pokemons", () => {
    expect(filterCreated("ALL")).toEqual({
      type: "FILTER_CREATED",
      payload: "ALL",
    });
  });

  it("El filtro deberia traerme los Pokemons más debiles de menor a mayor", () => {
    expect(filterAttack("LOWERFORCE")).toEqual({
      type: "FILTER_ATTACK",
      payload: "LOWERFORCE",
    });
  });

  it("El filtro deberia traerme los Pokemons más fuertes de mayor a menor", () => {
    expect(filterAttack("HIGHFORCE")).toEqual({
      type: "FILTER_ATTACK",
      payload: "HIGHFORCE",
    });
  });

  it("El filtro deberia traerme los Pokemons alfabeticamente en orden descendente", () => {
    expect(Sort("FALLING")).toEqual({
      type: "SORT",
      payload: "FALLING",
    });
  });

  it("El filtro deberia traerme los Pokemons alfabeticamente en orden ascedente", () => {
    expect(Sort("UPWARD")).toEqual({
      type: "SORT",
      payload: "UPWARD",
    });
  });

  it("Deberia retornar una funcion al buscar un Pokemon", () => {
    expect(typeof searchPoke("pikachu")).toEqual(("function"));
  });

  it("Deberia retornar una funcion al traer los Pokemons", () => {
    expect(typeof getPokemons()).toEqual(("function"));
  });

});
