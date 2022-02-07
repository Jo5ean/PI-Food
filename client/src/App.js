import './App.css';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Landing from './components/Landing';
import Detail from './components/Detail';

function App() {
  return (
   <BrowserRouter>
   <div className='App'>
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/home/:id' element={<Detail />} />
      </Routes>
   </div>
    </BrowserRouter>
  );
}

export default App;
