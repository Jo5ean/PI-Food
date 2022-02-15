import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Let's Taste!/i);
  expect(linkElement).toBeInTheDocument();
});

import {configure, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });


describe('App', () => {
  let wrapper = shallow(<App />);
  it('should be a function', () => {
    expect(typeof(App)).toBe('function');
  });
  it('should render a <div>', () => {
    expect(wrapper.find('div'))
  });
  it('should render a <h1>', () => {
    expect(wrapper.find('h1'))
  });
});







// const assert = require('assert');
// const request = require('supertest');

// request(App)
//   .get('/home/716426')
//   .expect('content-type', /json/)
//   .expect(200)
//   .end((err, res) => {
//     if (err) throw err;
//     assert.equal(res.body.id, 716426);
//   }
//   );

// describe('GET /home/:id', function(){
//   it('responds with json', function(done){
//    request(App)
//       .get('/home/716426')
//       .set('Accept', 'application/json')
//       .expect('content-type', /html/)
//       .expect(200, done);
//   });
// })