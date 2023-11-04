import { useNavigate } from "react-router-dom";
import Blog from "../../assets/Blog.jpg"

import "./registration.css"

const Registration = () => {

    const navigate = useNavigate()
    const loginPage = () => {
        navigate('/login')
    }
    return (
        <div className="registration-container">
           <div className="registration-box">
                <div className="input-form">
                    <h1 className="registration-heading">Registration</h1>
                    <input className="registration-input-field"  placeholder="Enter Your Name"/>
                    <input className="registration-input-field"  placeholder="Enter Your Email"/>
                    <input className="registration-input-field"  placeholder="Enter Your Password"/>
                    <input className="registration-input-field"  placeholder="Confirm Password"/>
                    <div className="registration-buttons">
                        <button className="registration-btn btn">Submit</button>
                        <button className="registration-btn create-account-btn btn" onClick={loginPage}>Already a user</button>
                    </div>
                </div>
                <div className="image">
                    <img src={Blog} className="registration-image" alt="Blog image" />
                </div>
           </div>
        </div>
    );
};

export default Registration;