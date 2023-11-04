import { Routes, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//Components import
import Login from './pages/login/Login'
import Registration from './pages/registration/Registration';

function App() {

  return (
    <div className='app-container'>
      <Routes>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/registration' element={<Registration />}></Route>
      </Routes>
    </div>
  )
}

export default App
