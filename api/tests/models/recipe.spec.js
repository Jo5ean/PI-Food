const { Recipe, Diet, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Milanesa a la napolitana' });
      });
    });
  });
});

describe("Diet model", () => {
  describe("Validators", () => {
    beforeEach(() => Diet.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is not a string', (done) => {
        Diet.findOrCreate({where: {name: 5}})
        .then(() => done(new Error('It requires a valid name')))
        .catch(()=>done());
      })
      it("should work with a valid name", () => {
        Diet.findOrCreate({ where: { name: 'Vegan' } });
      });
    });
  });
});
