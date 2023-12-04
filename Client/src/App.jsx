import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//Components import
import LoginPage from './pages/login/LoginPage'
import RegistrationPage from './pages/registration/RegistrationPage';
import ResetPasswordPage from './pages/resetPassword/ResetPasswordPage'


// React toastity
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div className='app-container'>
      <Routes>
        <Route exact path='/login' element={<LoginPage />}></Route>
        <Route exact path='/registration' element={<RegistrationPage />}></Route>
        <Route exact path='/reset-password' element={<ResetPasswordPage />}></Route>
      </Routes>
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
