/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, Diet, conn } = require('../../src/db.js');

const agent = session(app);

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  describe("GET /recipe", () => {
    it("should get 200", (done) => {
      agent.get('/recipe/get').expect(200), done();
    });
    it("reponse is 200", () => agent.get('/recipe/get').expect(200));
      it("response is 200", ()=> agent.get('/recipe/get/716426').expect(200));
  });
});
    

//   beforeEach(() => Recipe.sync({ force: true })
//     .then(() => Recipe.create(recipe)));
//   describe('GET /recipes/get/', () => {
//     it('should get 200', () =>
//       agent.get('/recipes/get/').expect(200)
//     );
//   });
// });
