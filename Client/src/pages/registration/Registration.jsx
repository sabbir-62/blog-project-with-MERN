//Imports Required components
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Blog from "../../assets/Blog.jpg"
import "./registration.css"


/*----------Registration Component----------*/
const Registration = () => {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    })

    //Set form value into state
    const setValues = (key, value) => {
        setState({
            ...state,
            [key]: value
        })
    }


    //Navigate login page
    const navigate = useNavigate()
    const loginPage = () => {
        navigate('/login')
    }
    //Return JSX
    return (
        <div className="registration-container">
           <div className="registration-box">
                <div className="input-form">
                    <h1 className="registration-heading">Registration</h1>
                    <input className="registration-input-field" placeholder="Enter Your Name" onChange={(e)=>setValues("name", e.target.value)}/>
                    <input className="registration-input-field" placeholder="Enter Your Email" onChange={(e)=>setValues("email", e.target.value)}/>
                    <input className="registration-input-field" placeholder="Enter Your Password" onChange={(e)=>setValues("password", e.target.value)}/>
                    <input className="registration-input-field" placeholder="Confirm Password" onChange={(e)=>setValues("cpassword", e.target.value)}/>
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