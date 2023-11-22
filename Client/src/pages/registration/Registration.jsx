//Imports Required components
import { toast } from 'react-toastify';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Blog from "../../assets/Blog.jpg"
import "./registration.css"


/*----------Registration Component----------*/
const Registration = () => {
    const [state, setState] = useState({
        name: "",
        email: "",
        userName: "",
        password: ""
    })

    //Set form value into state
    const setValues = (key, value) => {
        setState({
            ...state,
            [key]: value
        })
    }

    // Sent data into backend using axios
   
    const [loading, setLoading] = useState(false);
    const handleClick = async() => {
        setLoading(true);
        const {name, email, userName, password} = state;
        const registrationUrl = 'http://localhost:8500/api/v1/registration';

        try{
            fetch(registrationUrl, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    name, email, userName, password
                })
            })
           .then((response) => response.json())
           .then((data) => {
                if(data.success){
                    toast.success(data.message)
                }
                else{
                    toast.error(data.message)
                }
           })
        }
       catch(error){
        console.error("Registration failed:", error);
        toast.error("Registration failed. Please try again.");
        }
        finally{
            setLoading(false)
        }
    
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
                    <input className="registration-input-field" placeholder="Enter Your UserName" onChange={(e)=>setValues("userName", e.target.value)}/>
                    <input className="registration-input-field" placeholder="Password" onChange={(e)=>setValues("password", e.target.value)}/>
                    <div className="registration-buttons">
                        <button className="registration-btn btn" onClick={handleClick}>Submit</button>
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