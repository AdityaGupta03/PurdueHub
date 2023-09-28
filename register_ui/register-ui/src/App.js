import logo from './logo.svg';

import Register from './Register';
import Login from './Login';
import Home from './Home';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
