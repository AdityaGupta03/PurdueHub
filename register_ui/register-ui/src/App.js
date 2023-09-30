import logo from './logo.svg';

import Register from './Register';
import Login from './Login';
import Home from './Home';
import ForgotPassword from './ForgotPassword';
import ForgotUsername from './ForgotUsername';
import ChangeUsername from './ChangeUsername';

import {BrowserRouter, Route, Routes} from 'react-router-dom';


function App() {

  return (
    <main className='App'>
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/forgotpass' element={<ForgotPassword />} />
        <Route path='/forgotusername' element={<ForgotUsername />} />
        <Route path='/changeusername' element={<ChangeUsername />} />
      </Routes>
    </BrowserRouter>
    </main>
  );
}

export default App;
