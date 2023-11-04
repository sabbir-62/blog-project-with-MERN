
import { useNavigate } from "react-router-dom";
import Blog from "../../assets/Blog.jpg"

import "./login.css"

const Login = () => {

    const navigate = useNavigate();
    const registrationPage = () => {
        navigate('/registration')
    }
   
    return (
        <div className="login-container">
           <div className="login-box">
                <div className="input-form">
                    <h1 className="login-heading">Login</h1>
                    <input className="login-input-field"  placeholder="Enter Your Email"/>
                    <input className="login-input-field"  placeholder="Enter Your Password"/>
                    <div className="login-buttons">
                        <button className="login-btn btn">Login</button>
                        <button className="login-btn create-account-btn btn" onClick={registrationPage}>Create account</button>
                    </div>
                </div>
                <div className="image">
                    <img src={Blog} className="login-image" alt="Blog image" />
                </div>
           </div>
        </div>
    );
};

export default Login;