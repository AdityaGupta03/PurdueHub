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
import VerifyEmail from './VerifyEmail';
import ViewCalendar from './ViewCalendar';
import ReportSubmission from './Report';
import Feedback from './Feedback';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css' // This is a temporary file pulled from tutorial
import DeleteAccount from './DeleteAccount';

function App() {

  sessionStorage.setItem('isLoggedIn', "false");
  localStorage.setItem('isLoggedIn', "false");

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
        <Route path='/viewprofile/:username' element={<ViewProfile />} />
        <Route path='/verify_email/:email' element={<VerifyEmail />} />
        <Route path='/viewlist' element={<ViewList />} />
        <Route path='/calendar' element={<ViewCalendar />} />
        
        <Route path='/report' element={<ReportSubmission />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/delete' element={<DeleteAccount />} />

      </Routes>
    </BrowserRouter>
    </main>
  );
}

export default App;
