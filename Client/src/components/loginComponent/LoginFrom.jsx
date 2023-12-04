import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useState } from "react";
import Styles from "./login.module.css"
import { NavLink } from "react-router-dom";

/*----------Login form----------*/
const LoginFrom = () => {
    const [state, setState] = useState({
        email: "",
        password: ""
    })

    //Set form value into state
    const setValues = (key, value) => {
        setState({
            ...state,
            [key]: value
        })
    }

    
    const [loading, setLoading] = useState(false);

    // Sent data into backend using fetch
    const handleClick = async() => {
        setLoading(true);
        const {name, email, userName, password} = state;
        const registrationUrl = 'http://localhost:8500/api/v1/login';

        try{
            fetch(registrationUrl, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    email, password
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
        console.error("Login failed:", error);
        toast.error("Login failed. Please try again.");
        }
        finally{
            setLoading(false)
        }
    
    }

    // navigate registration page
    const navigate = useNavigate();
    const registrationPage = () => {
        navigate('/registration')
    }
   
    // return jsx
    return (
        <div className={Styles.inputForm}>
            <h1 className={Styles.loginHeading}>Login</h1>
            <input className={Styles.loginInputField} placeholder="Enter Your Email" onChange={(e)=>setValues("email", e.target.value)}/>
            <input className={Styles.loginInputField} placeholder="Password" onChange={(e)=>setValues("password", e.target.value)}/>
            <NavLink className={Styles.forgetBtn} to="/forget-password">Forget Password?</NavLink>
            <div className={Styles.loginButtons}>
                <button className={`btn ${Styles.loginBtn}`}  onClick={handleClick}>Submit</button>
                <button className={`btn ${Styles.loginBtn}`} onClick={registrationPage}>Not a user</button>
            </div>
        </div>
    );
};

export default LoginFrom;