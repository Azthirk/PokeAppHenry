const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));

    describe('name', () => {
      it('Debería arrojar un error si el nombre es nulo', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('Requiere un nombre válido')))
          .catch(() => done());
      });
      it('Debería funcionar cuando es un nombre válido', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
    });

    describe('life', () => {
      it('Debería arrojar un error si la vida es nula', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('Requiere una vida válida')))
          .catch(() => done());
      });
      it('Debería funcionar cuando es una vida válida', () => {
        Pokemon.create({ life: 999 });
      });
    });

    describe('attack', () => {
      it('Debería arrojar un error si el ataque es nulo', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('Requiere una vida válido')))
          .catch(() => done());
      });
      it('Debería funcionar cuando es un ataque válida', () => {
        Pokemon.create({ attack: 999 });
      });
    });

    describe('defense', () => {
      it('Debería arrojar un error si la defensa es nula', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('Requiere una defensa válida')))
          .catch(() => done());
      });
      it('Debería funcionar cuando es una defensa válida', () => {
        Pokemon.create({ defense: 999 });
      });
    });

    describe('height', () => {
      it('Debería arrojar un error si la altura es nula', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('Requiere una altura válida')))
          .catch(() => done());
      });
      it('Debería funcionar cuando es una altura válida', () => {
        Pokemon.create({ height: 999 });
      });
    });

    describe('weight', () => {
      it('Debería arrojar un error si el peso es nulo', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('Requiere una peso válido')))
          .catch(() => done());
      });
      it('Debería funcionar cuando es un peso válido', () => {
        Pokemon.create({ weight: 999 });
      });
    });

    describe('type', () => {
      it('Debería arrojar un error si el tipo es nulo', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('Requiere un tipo válido')))
          .catch(() => done());
      });
      it('Debería funcionar cuando es un tipo válido', () => {
        Pokemon.create({ type: ['Poison'] });
      });
    });

    describe('speed', () => {
      it('Debería arrojar un error si la velocidad es nula', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('Requiere una velocidad válida')))
          .catch(() => done());
      });
      it('Debería funcionar cuando es una velocidad válida', () => {
        Pokemon.create({ speed: 999 });
      });
    });

    describe('image', () => {
      it('Debería arrojar un error si la imagen es nula', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('Requiere una imagen válida')))
          .catch(() => done());
      });
      it('Debería funcionar cuando es una imagen válida', () => {
        Pokemon.create({ image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' });
      });
    });
    
  });

  
});


