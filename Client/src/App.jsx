import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// React toastity
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Components import
import LoginPage from './pages/login/LoginPage'
import RegistrationPage from './pages/registration/RegistrationPage';
import ResetPasswordPage from './pages/resetPassword/ResetPasswordPage';
import ForgetPasswordPage from './pages/forgetPassword/ForgetPasswordPage';
import OTPPage from './pages/otpVerificationPage/OTPPage';
import DataProvider from './components/contextApi/DataProvider';

//import pages
import Home from './pages/homePage/Home';


function App() {

  return (
    <div className='app-container'>
      <DataProvider>
        <Routes>
          {/* user verification */}
          <Route exact path='/login' element={<LoginPage />}></Route>
          <Route exact path='/registration' element={<RegistrationPage />}></Route>
          <Route exact path='/reset-password' element={<ResetPasswordPage />}></Route>
          <Route exact path='/forget-password' element={<ForgetPasswordPage />}></Route>
          <Route exact path='/verify-email' element={<OTPPage />}></Route>

          {/* pages */}
          <Route exact path='/' element={<Home />}></Route>
        </Routes>
      </DataProvider>


      <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              />
    </div>
  )
}

export default App
