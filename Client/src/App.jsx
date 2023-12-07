import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// React toastity
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import pages
import Home from "./pages/homePage/Home";
import LoginPage from "./pages/login/LoginPage";
import RegistrationPage from "./pages/registration/RegistrationPage";
import ResetPasswordPage from "./pages/resetPassword/ResetPasswordPage";
import ForgetPasswordPage from "./pages/forgetPassword/ForgetPasswordPage";
import OTPPage from "./pages/otpVerificationPage/OTPPage";

// Import components
import Header from "./components/hearder/Header";

//context api
import { useContext, useEffect } from "react";
import { LoginContext } from "./components/contextApi/DataProvider";





function App() {
  const { isLoggedIn, setLoggedIn } = useContext(LoginContext);
  const getToken = localStorage.getItem('access token');

  const navigate = useNavigate()

  useEffect(() => {
    // Update login status after component has rendered
    if (getToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      navigate('/login')
      toast.warning("Please login")
    }
  }, [getToken, setLoggedIn, navigate]);



  return (
    <div className="app-container">
      {isLoggedIn ? (
        <div>
          <Header />
          <Routes>
            {/* user verification */}
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/logout" element={<LoginPage />} />
            <Route exact path="/registration" element={<RegistrationPage />} />
            <Route exact path="/reset-password" element={<ResetPasswordPage />} />
            <Route exact path="/forget-password" element={<ForgetPasswordPage />} />
            <Route exact path="/verify-email" element={<OTPPage />} />

            {/* pages */}
            <Route exact path="/" element={<Home />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          {/* user verification */}
          <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/logout" element={<LoginPage />} />
            <Route exact path="/registration" element={<RegistrationPage />} />
            <Route exact path="/reset-password" element={<ResetPasswordPage />} />
            <Route exact path="/forget-password" element={<ForgetPasswordPage />} />
            <Route exact path="/verify-email" element={<OTPPage />} />
        </Routes>
      )}

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
  );
}

export default App;
