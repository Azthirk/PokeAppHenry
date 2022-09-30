/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn, Type } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
  life: 999,
  defense: 999,
  attack: 999,
  speed: 999,
  weight: 999,
  height: 999,
  skills: "Test",
  image:"NO",
  description: "Test",
};

describe('Pokemon routes', () => {
  
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Pokemon.sync({ force: true })
    // .then(() => Pokemon.create(pokemon))
    // .then(() => Type.create(pokemon)));
    .then());
    describe("/pokemons?name=", function () {
      it("Deberia devolver el nombre del Pokemon pasado", function () {
        return agent.get("/pokemons?name=bulbasaur").expect(function (res) {
          expect(res.body[0].name).equal("bulbasaur");
        });
      }).timeout(3000);
      it("Deberia devolver los tipos del Pokemon pasado", function () {
        return agent.get("/pokemons?name=bulbasaur").expect(function (res) {
          expect(res.body[0].types.length).equal(2);
        });
      }).timeout(3000);
      it("Deberia devolver la imagen del Pokemon pasado", function () {
        return agent.get("/pokemons?name=bulbasaur").expect(function (res) {
          expect(res.body[0].image).equal("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png");
        });
      }).timeout(3000);
    });

    describe("/pokemons/:id", function () {
      it("Deberia devolver las propiedades del Pokemon pasado por ID", function () {
        return agent.get("/pokemons/1").expect(function (res) {
          expect(typeof res.body[0]).equal("object");
        });
      }).timeout(3000);
      
      it("Deberia devolver el nombre del Pokemon pasado por ID", function () {
        return agent.get("/pokemons/1").expect(function (res) {
          expect(res.body[0].name).equal("bulbasaur");
        });
      }).timeout(3000);
      
      it("Deberia devolver los tipos del Pokemon pasado por ID", function () {
        return agent.get("/pokemons/1").expect(function (res) {
          expect(res.body[0].types.length).equal(2);
        });
      }).timeout(3000);

      it("Deberia devolver la imagen del Pokemon pasado por ID", function () {
        return agent.get("/pokemons/1").expect(function (res) {
          expect(res.body[0].image).equal("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png");
        });
      }).timeout(3000);

    });

});

