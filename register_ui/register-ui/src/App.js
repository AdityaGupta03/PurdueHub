import Register from './Register';
import Login from './Login';
import Home from './Home';
import ForgotPassword from './ForgotPassword';
import ForgotUsername from './ForgotUsername';
import ChangeUsername from './ChangeUsername';
import ChangePassword from './ChangePassword';
import PasswordAuthCode from './PasswordAuthCode';
import UserProfile from './UserProfile';
import ViewProfile from './ViewProfile';
import ViewList from './ViewList';
import UsernameAuthCode from './UsernameAuthCode';

import {BrowserRouter, Route, Routes} from 'react-router-dom';


function App() {

  sessionStorage.setItem('isLoggedIn', "false");

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
        <Route path='/changepassword' element={<ChangePassword />} />
        <Route path='/password-authentication-code' element={<PasswordAuthCode />} />
        <Route path='/username-authentication-code' element={<UsernameAuthCode />} />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='/viewprofile' element={<ViewProfile />} />
        <Route path='/viewlist' element={<ViewList />} />
      </Routes>
    </BrowserRouter>
    </main>
  );
}

export default App;
